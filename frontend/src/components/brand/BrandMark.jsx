import React from "react";
import { Box } from "@chakra-ui/react";

/* =============================================================
   BRAND MARK
   Canonical Springboard brand mark.
============================================================= */

export default function BrandMark({ dark = false }) {
  return (
    <Box position="relative" w="42px" h="48px" flexShrink={0}>
      <Chevron top="2px" color={dark ? "white" : "brand.500"} />

      <Chevron top="14px" color={dark ? "white" : "brand.500"} />

      <Chevron top="26px" color="accent.500" />
    </Box>
  );
}

function Chevron({ top, color }) {
  return (
    <Box
      position="absolute"
      top={top}
      left="2px"
      w="30px"
      h="30px"
      borderTop="8px solid"
      borderLeft="8px solid"
      borderColor={color}
      transform="rotate(45deg)"
    />
  );
}
