import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";

/* =============================================================
   BRAND WORDMARK
   Springboard + Talent Partners + Progress. Elevate.
============================================================= */

export default function BrandWordmark({ dark = false }) {
  const primaryColor = dark ? "white" : "brand.500";
  const accentColor = dark ? "accent.300" : "accent.500";
  const taglineColor = dark ? "whiteAlpha.800" : "charcoal.800";

  return (
    <Box lineHeight={1}>
      <Text
        fontFamily="heading"
        fontSize={{ base: "xl", md: "2xl" }}
        color={primaryColor}
        letterSpacing="0.08em"
        fontWeight="500"
      >
        Springboard
      </Text>

      <HStack spacing={2} mt={1}>
        <Box h="1px" w="14px" bg={accentColor} />

        <Text
          fontSize="8px"
          letterSpacing="0.28em"
          fontWeight="700"
          color={accentColor}
        >
          TALENT PARTNERS
        </Text>

        <Box h="1px" w="14px" bg={accentColor} />
      </HStack>

      <Text
        fontSize="9px"
        color={taglineColor}
        textAlign="center"
        letterSpacing="0.08em"
        mt={1.5}
      >
        Progress. Elevate.
      </Text>
    </Box>
  );
}
