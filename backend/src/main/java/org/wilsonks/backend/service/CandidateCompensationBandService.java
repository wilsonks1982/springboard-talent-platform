package org.wilsonks.backend.service;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class CandidateCompensationBandService {

    public String calculateBand(BigDecimal ctc) {

        if (ctc == null) {
            return null;
        }

        BigDecimal tenLakh = BigDecimal.valueOf(1_000_000);
        BigDecimal fifteenLakh = BigDecimal.valueOf(1_500_000);
        BigDecimal twentyLakh = BigDecimal.valueOf(2_000_000);
        BigDecimal thirtyLakh = BigDecimal.valueOf(3_000_000);
        BigDecimal fortyLakh = BigDecimal.valueOf(4_000_000);
        BigDecimal fiftyLakh = BigDecimal.valueOf(5_000_000);
        BigDecimal seventyFiveLakh = BigDecimal.valueOf(7_500_000);
        BigDecimal oneCrore = BigDecimal.valueOf(10_000_000);

        if (ctc.compareTo(tenLakh) < 0) {
            return "Below ₹10L";
        }

        if (ctc.compareTo(fifteenLakh) < 0) {
            return "₹10–15 LPA";
        }

        if (ctc.compareTo(twentyLakh) < 0) {
            return "₹15–20 LPA";
        }

        if (ctc.compareTo(thirtyLakh) < 0) {
            return "₹20–30 LPA";
        }

        if (ctc.compareTo(fortyLakh) < 0) {
            return "₹30–40 LPA";
        }

        if (ctc.compareTo(fiftyLakh) < 0) {
            return "₹40–50 LPA";
        }

        if (ctc.compareTo(seventyFiveLakh) < 0) {
            return "₹50–75 LPA";
        }

        if (ctc.compareTo(oneCrore) < 0) {
            return "₹75L–1Cr";
        }

        return "Above ₹1Cr";
    }
}