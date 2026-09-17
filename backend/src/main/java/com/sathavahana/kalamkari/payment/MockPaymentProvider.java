package com.sathavahana.kalamkari.payment;
import org.springframework.stereotype.Component; import java.math.BigDecimal; import java.util.UUID;
@Component public class MockPaymentProvider implements PaymentPort { public String createPayment(Long orderId,BigDecimal amount){return "mock_"+UUID.randomUUID();} }
