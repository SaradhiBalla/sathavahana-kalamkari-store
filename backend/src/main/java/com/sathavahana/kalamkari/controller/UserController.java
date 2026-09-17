package com.sathavahana.kalamkari.controller;

import com.sathavahana.kalamkari.dto.UserDto;
import com.sathavahana.kalamkari.service.CurrentUser;
import com.sathavahana.kalamkari.domain.*;
import com.sathavahana.kalamkari.repository.AddressRepository;
import com.sathavahana.kalamkari.service.PasswordHasher;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final CurrentUser currentUser; private final AddressRepository addresses; private final PasswordHasher hasher; private final com.sathavahana.kalamkari.repository.UserRepository users; private final com.sathavahana.kalamkari.service.RbacService rbac;

    public UserController(CurrentUser currentUser, AddressRepository addresses, PasswordHasher hasher, com.sathavahana.kalamkari.repository.UserRepository users, com.sathavahana.kalamkari.service.RbacService rbac) {
        this.currentUser = currentUser; this.addresses=addresses; this.hasher=hasher; this.users=users; this.rbac=rbac;
    }

    @GetMapping("/me")
    public UserDto me() {
        return UserDto.of(currentUser.require());
    }
    public record Profile(@NotBlank @Size(max=100) String firstName,@Size(max=100) String lastName,@Size(max=30) String phone) {}
    public record Password(@NotBlank String currentPassword,@NotBlank @Size(min=8) String newPassword) {}
    public record AddressInput(@NotBlank String recipientName,@NotBlank String line1,String line2,@NotBlank String city,@NotBlank String state,@NotBlank String postalCode,String country,String phone) {}
    public record AddressView(Long id,String recipientName,String line1,String line2,String city,String state,String postalCode,String country,String phone) {
        static AddressView of(Address a){return new AddressView(a.getId(),a.getRecipientName(),a.getLine1(),a.getLine2(),a.getCity(),a.getState(),a.getPostalCode(),a.getCountry(),a.getPhone());}
    }
    @GetMapping("/me/profile") public UserDto profile(){return me();}
    @PutMapping({"/me/profile","/me"}) public UserDto update(@Valid @RequestBody Profile p){User u=currentUser.require();u.setFirstName(p.firstName().trim());u.setLastName(p.lastName());u.setPhone(p.phone());return UserDto.of(users.save(u));}
    @PostMapping({"/me/password","/me/change-password"}) public void password(@Valid @RequestBody Password p){User u=currentUser.require();if(!hasher.matches(p.currentPassword(),u.getPasswordHash())) throw new IllegalArgumentException("Current password is incorrect");u.setPasswordHash(hasher.hash(p.newPassword()));users.save(u);}
    @GetMapping("/me/permissions") public Set<String> permissions(){return rbac.permissions(currentUser.require().getId());}
    @GetMapping("/me/addresses") public List<AddressView> listAddresses(){return addresses.findAllByUserIdOrderByIdDesc(currentUser.require().getId()).stream().map(AddressView::of).toList();}
    @PostMapping("/me/addresses") public AddressView addAddress(@Valid @RequestBody AddressInput p){return AddressView.of(addresses.save(fill(new Address(),p,currentUser.require())));}
    @PutMapping("/me/addresses/{id}") public AddressView updateAddress(@PathVariable Long id,@Valid @RequestBody AddressInput p){Address a=addresses.findByIdAndUserId(id,currentUser.require().getId()).orElseThrow(()->new com.sathavahana.kalamkari.service.NotFoundException("Address not found"));return AddressView.of(addresses.save(fill(a,p,a.getUser())));}
    @DeleteMapping("/me/addresses/{id}") public void deleteAddress(@PathVariable Long id){Address a=addresses.findByIdAndUserId(id,currentUser.require().getId()).orElseThrow(()->new com.sathavahana.kalamkari.service.NotFoundException("Address not found"));addresses.delete(a);}
    private Address fill(Address a,AddressInput p,User u){a.setUser(u);a.setRecipientName(p.recipientName());a.setLine1(p.line1());a.setLine2(p.line2());a.setCity(p.city());a.setState(p.state());a.setPostalCode(p.postalCode());a.setCountry(p.country()==null?"India":p.country());a.setPhone(p.phone());return a;}
}
