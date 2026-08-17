import React, { useRef } from "react";
import { Box, Checkbox, Text, VStack } from "@chakra-ui/react";

export default function ScrollGate({ title, accepted, onEnd, onAccept }) {
  const reached = useRef(false);

  const handleScroll = (event) => {
    const element = event.currentTarget;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 8) {
      reached.current = true;
      onEnd();
    }
  };

  return (
    <VStack align="stretch" spacing={5}>
      <Text fontSize="2xl" fontWeight="700">{title}</Text>

      <Box
        onScroll={handleScroll}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="lg"
        p={5}
        h="360px"
        overflowY="auto"
        bg="gray.50"
      >
        <VStack align="stretch" spacing={4}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Text key={index}>
              {index === 0
                ? "Placeholder legal text. Replace with counsel-reviewed final copy before production."
                : `Section ${index}: This prototype document content represents the confidentiality/privacy terms that the candidate must review before acceptance.`}
            </Text>
          ))}
        </VStack>
      </Box>

      <Checkbox
        isChecked={accepted}
        isDisabled={!reached.current}
        onChange={(e) => e.target.checked && onAccept()}
      >
        I have read and agree to this document.
      </Checkbox>

      {!reached.current && (
        <Text fontSize="sm" color="gray.500">
          Scroll to the end to enable acceptance.
        </Text>
      )}
    </VStack>
  );
}