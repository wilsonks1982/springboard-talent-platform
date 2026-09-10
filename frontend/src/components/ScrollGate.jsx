import React, { useRef } from "react";
import { Box, Checkbox, HStack, Text, VStack } from "@chakra-ui/react";
import { FileText, LockKeyhole, CheckCircle2 } from "lucide-react";

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
    <VStack align="stretch" spacing={{ base: 5, md: 6 }}>
      {/* Document Header */}
      <HStack spacing={4} align="start">
        <Box
          w={{ base: 11, md: 12 }}
          h={{ base: 11, md: 12 }}
          borderRadius="xl"
          bg="purple.50"
          border="1px solid"
          borderColor="purple.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <FileText size={22} color="#805AD5" strokeWidth={1.8} />
        </Box>

        <VStack align="start" spacing={1}>
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="800"
            color="gray.800"
            letterSpacing="-0.4px"
            lineHeight="1.25"
          >
            {title}
          </Text>

          <Text fontSize="sm" color="gray.500" lineHeight="1.5">
            Please review the complete document before continuing.
          </Text>
        </VStack>
      </HStack>

      {/* Document Viewer */}
      <Box
        border="1px solid"
        borderColor="purple.100"
        borderRadius="xl"
        overflow="hidden"
        bg="white"
        boxShadow="0 6px 20px rgba(88, 28, 135, 0.06)"
      >
        {/* Viewer Header */}
        <HStack
          justify="space-between"
          px={{ base: 4, md: 5 }}
          py={3}
          bg="purple.50"
          borderBottom="1px solid"
          borderColor="purple.100"
        >
          <HStack spacing={2}>
            <LockKeyhole size={15} color="#805AD5" />

            <Text
              fontSize="xs"
              fontWeight="700"
              color="purple.700"
              textTransform="uppercase"
              letterSpacing="0.5px"
            >
              Secure Document
            </Text>
          </HStack>

          {!reached.current && (
            <Text
              fontSize="xs"
              color="gray.500"
              display={{ base: "none", sm: "block" }}
            >
              Scroll to review
            </Text>
          )}
        </HStack>

        {/* Scrollable Document */}
        <Box
          onScroll={handleScroll}
          h={{ base: "320px", md: "360px" }}
          overflowY="auto"
          px={{ base: 4, md: 6 }}
          py={{ base: 5, md: 6 }}
          bg="linear-gradient(180deg, #faf9ff 0%, #ffffff 18%, #ffffff 100%)"
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f7f5ff",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#d6bcfa",
              borderRadius: "999px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#b794f4",
            },
          }}
        >
          <VStack align="stretch" spacing={5}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Box key={index}>
                {index === 0 ? (
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="gray.700"
                    lineHeight="1.75"
                  >
                    Placeholder legal text. Replace with counsel-reviewed final
                    copy before production.
                  </Text>
                ) : (
                  <>
                    <Text
                      fontSize="sm"
                      fontWeight="700"
                      color="purple.700"
                      mb={1}
                    >
                      Section {index}
                    </Text>

                    <Text fontSize="sm" color="gray.600" lineHeight="1.75">
                      This prototype document content represents the
                      confidentiality/privacy terms that the candidate must
                      review before acceptance.
                    </Text>
                  </>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>

      {/* Acceptance Area */}
      <Box
        p={{ base: 4, md: 5 }}
        borderRadius="xl"
        border="1px solid"
        borderColor={
          accepted ? "purple.200" : reached.current ? "purple.100" : "gray.200"
        }
        bg={accepted ? "purple.50" : "white"}
        transition="all 0.25s ease"
      >
        <Checkbox
          isChecked={accepted}
          isDisabled={!reached.current}
          onChange={(e) => e.target.checked && onAccept()}
          colorScheme="purple"
          size="lg"
        >
          <Text
            fontSize="sm"
            fontWeight="600"
            color={
              accepted
                ? "purple.800"
                : reached.current
                  ? "gray.700"
                  : "gray.400"
            }
            ml={1}
          >
            I have read and agree to this document.
          </Text>
        </Checkbox>

        {/* Scroll Instruction */}
        {!reached.current && (
          <HStack mt={3} spacing={2} align="start" color="gray.500">
            <Box
              w="6px"
              h="6px"
              borderRadius="full"
              bg="purple.400"
              mt="6px"
              flexShrink={0}
            />

            <Text fontSize="xs" lineHeight="1.5">
              Scroll to the end of the document to enable acceptance.
            </Text>
          </HStack>
        )}

        {/* Accepted State */}
        {accepted && (
          <HStack mt={3} spacing={2} color="purple.700">
            <CheckCircle2 size={15} />

            <Text fontSize="xs" fontWeight="600">
              Document reviewed and accepted.
            </Text>
          </HStack>
        )}
      </Box>
    </VStack>
  );
}
