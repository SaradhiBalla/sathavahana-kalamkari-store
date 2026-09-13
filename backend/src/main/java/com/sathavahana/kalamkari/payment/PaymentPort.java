package com.sathavahana.kalamkari.payment;
import java.math.BigDecimal;
/** Payment provider boundary. Implement an adapter before enabling production payment capture. */
public interface PaymentPort { String createPayment(Long orderId, BigDecimal amount); }
