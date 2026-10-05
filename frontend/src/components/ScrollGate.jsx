import React, { useRef } from "react";
import { Box, Checkbox, HStack, Icon, Text, VStack } from "@chakra-ui/react";
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
      {/* =====================================================
          DOCUMENT HEADER
      ===================================================== */}
      <HStack spacing={4} align="start">
        <Box
          w={{ base: "42px", md: "44px" }}
          h={{ base: "42px", md: "44px" }}
          borderRadius="4px"
          bg="accent.50"
          border="1px solid"
          borderColor="accent.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Icon
            as={FileText}
            boxSize="19px"
            color="accent.600"
            strokeWidth={1.8}
          />
        </Box>

        <VStack align="start" spacing={1}>
          <Text
            fontFamily="heading"
            fontSize={{
              base: "xl",
              md: "2xl",
            }}
            fontWeight="500"
            color="brand.500"
            lineHeight="1.25"
          >
            {title}
          </Text>

          <Text fontSize="sm" color="taupe.500" lineHeight="1.5">
            Please review the complete document before continuing.
          </Text>
        </VStack>
      </HStack>

      {/* =====================================================
          DOCUMENT VIEWER
      ===================================================== */}
      <Box
        border="1px solid"
        borderColor="cream.300"
        borderRadius="5px"
        overflow="hidden"
        bg="white"
        boxShadow="0 8px 24px rgba(46, 42, 40, 0.05)"
      >
        {/* ===================================================
            VIEWER HEADER
        =================================================== */}
        <HStack
          justify="space-between"
          px={{ base: 4, md: 5 }}
          py={3}
          bg="cream.100"
          borderBottom="1px solid"
          borderColor="cream.300"
        >
          <HStack spacing={2}>
            <Icon as={LockKeyhole} boxSize="15px" color="accent.600" />

            <Text
              fontSize="10px"
              fontWeight="800"
              color="brand.500"
              textTransform="uppercase"
              letterSpacing="0.12em"
            >
              Secure Document
            </Text>
          </HStack>

          {!reached.current && (
            <Text
              fontSize="xs"
              color="taupe.500"
              display={{
                base: "none",
                sm: "block",
              }}
            >
              Scroll to review
            </Text>
          )}

          {reached.current && (
            <Text
              fontSize="xs"
              color="accent.700"
              fontWeight="600"
              display={{
                base: "none",
                sm: "block",
              }}
            >
              Document reviewed
            </Text>
          )}
        </HStack>

        {/* ===================================================
            SCROLLABLE DOCUMENT
        =================================================== */}
        <Box
          onScroll={handleScroll}
          h={{
            base: "320px",
            md: "360px",
          }}
          overflowY="auto"
          px={{
            base: 4,
            md: 6,
          }}
          py={{
            base: 5,
            md: 6,
          }}
          bg="cream.50"
          sx={{
            "&::-webkit-scrollbar": {
              width: "7px",
            },

            "&::-webkit-scrollbar-track": {
              background: "#F2F0EE",
            },

            "&::-webkit-scrollbar-thumb": {
              background: "#B3AAA3",
              borderRadius: "4px",
            },

            "&::-webkit-scrollbar-thumb:hover": {
              background: "#8A7F76",
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
                    color="charcoal.700"
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
                      color="brand.500"
                      mb={1}
                    >
                      Section {index}
                    </Text>

                    <Text fontSize="sm" color="taupe.600" lineHeight="1.75">
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

      {/* =====================================================
          ACCEPTANCE AREA
      ===================================================== */}
      <Box
        p={{
          base: 4,
          md: 5,
        }}
        borderRadius="5px"
        border="1px solid"
        borderColor={
          accepted
            ? "success.200"
            : reached.current
              ? "accent.200"
              : "cream.300"
        }
        bg={accepted ? "success.50" : reached.current ? "accent.50" : "white"}
        transition="all 0.2s ease"
      >
        <Checkbox
          isChecked={accepted}
          isDisabled={!reached.current}
          onChange={(e) => e.target.checked && onAccept()}
          colorScheme="brand"
          size="lg"
        >
          <Text
            fontSize="sm"
            fontWeight="600"
            color={
              accepted
                ? "success.700"
                : reached.current
                  ? "charcoal.700"
                  : "taupe.400"
            }
            ml={1}
          >
            I have read and agree to this document.
          </Text>
        </Checkbox>

        {/* ===================================================
            SCROLL INSTRUCTION
        =================================================== */}
        {!reached.current && (
          <HStack mt={3} spacing={2} align="start">
            <Box
              w="6px"
              h="6px"
              borderRadius="full"
              bg="accent.500"
              mt="6px"
              flexShrink={0}
            />

            <Text fontSize="xs" color="taupe.500" lineHeight="1.5">
              Scroll to the end of the document to enable acceptance.
            </Text>
          </HStack>
        )}

        {/* ===================================================
            ACCEPTED STATE
        =================================================== */}
        {accepted && (
          <HStack mt={3} spacing={2} color="success.600">
            <Icon as={CheckCircle2} boxSize="15px" />

            <Text fontSize="xs" fontWeight="600">
              Document reviewed and accepted.
            </Text>
          </HStack>
        )}
      </Box>
    </VStack>
  );
}
