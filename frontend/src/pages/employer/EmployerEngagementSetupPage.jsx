import React, { useState } from "react";
import {
  Alert, AlertIcon, Box, Button, Container, Heading, HStack,
  SimpleGrid, Stack, Text, Textarea, VStack,
} from "@chakra-ui/react";
import {
  ArrowRight, BriefcaseBusiness, Check, CheckCircle2,
  ChevronLeft, UsersRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import BrandMark from "../../components/brand/BrandMark";
import BrandWordmark from "../../components/brand/BrandWordmark";
import { employerEngagementApi } from "../../api/employerEngagementApi";

const ENGAGEMENTS = [
  {
    value: "HIRING_TALENT_SEARCH",
    icon: BriefcaseBusiness,
    eyebrow: "Hiring",
    title: "Hiring & Talent Search",
    description:
      "Find qualified professionals, define your hiring needs, and build a focused recruitment pipeline with Springboard.",
    points: ["Talent search", "Role creation", "Candidate screening", "Hiring workflow"],
    contextLabel: "What are you looking to hire?",
    contextPlaceholder:
      "Tell us about the roles, skills, locations, or urgency you have in mind.",
  },
  {
    value: "OUTPLACEMENT_SUPPORT",
    icon: UsersRound,
    eyebrow: "People transition",
    title: "Outplacement Support",
    description:
      "Support employees through career transition with structured guidance and access to new opportunities.",
    points: ["Employee transition", "Career support", "Talent opportunities", "Structured follow-through"],
    contextLabel: "Tell us about your transition requirement",
    contextPlaceholder:
      "Share the approximate scale, timeline, or context of the transition.",
  },
];

export default function EmployerEngagementSetupPage() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const [context, setContext] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [createdEngagement, setCreatedEngagement] = useState(null);

  const selectedEngagement = ENGAGEMENTS.find(
    (item) => item.value === selectedType,
  );

  const selectEngagement = (value) => {
    setSelectedType(value);
    setError("");
    setCreatedEngagement(null);
  };

  const handleSubmit = async () => {
    if (!selectedType) {
      setError("Please choose the engagement you want to start with.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await employerEngagementApi.create({
        engagementType: selectedType,
        context,
      });
      setCreatedEngagement(response);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "We couldn't save your engagement selection. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (createdEngagement) {
    return (
      <PendingVerification
        engagement={createdEngagement}
        onContinue={() => navigate("/employer")}
      />
    );
  }

  return (
    <Box minH="100vh" bg="cream.100" color="charcoal.800">
      <Box
        borderBottom="1px solid"
        borderColor="cream.300"
        bg="rgba(254,253,252,0.96)"
      >
        <Container maxW="1180px" px={{ base: 5, md: 8 }} py={4}>
          <HStack justify="space-between">
            <HStack spacing={3}>
              <BrandMark />
              <BrandWordmark />
            </HStack>
            <Button
              variant="ghostBrand"
              size="sm"
              borderRadius="4px"
              leftIcon={<ChevronLeft size={15} />}
              onClick={() => navigate("/employer/register")}
            >
              Back
            </Button>
          </HStack>
        </Container>
      </Box>

      <Container
        maxW="1120px"
        px={{ base: 5, md: 8 }}
        py={{ base: 10, md: 16, lg: 20 }}
      >
        <VStack align="stretch" spacing={10}>
          <Box maxW="760px">
            <Text textStyle="overline" color="accent.600" mb={4}>
              Employer Setup · 02
            </Text>
            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="500"
              fontStyle="italic"
              lineHeight="1.08"
              letterSpacing="-0.04em"
              color="brand.500"
            >
              What brings you to Springboard?
            </Heading>
            <Box mt={6} w="58px" h="3px" bg="accent.500" />
            <Text
              mt={6}
              maxW="720px"
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="1.85"
              color="taupe.600"
            >
              Choose the engagement you'd like to start with. You can add
              another engagement later without creating a second company
              account.
            </Text>
          </Box>

          {error && (
            <Alert
              status="error"
              bg="error.50"
              border="1px solid"
              borderColor="error.200"
              borderRadius="5px"
              color="error.700"
            >
              <AlertIcon />
              {error}
            </Alert>
          )}

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {ENGAGEMENTS.map((engagement) => {
              const selected = selectedType === engagement.value;
              const Icon = engagement.icon;

              return (
                <Box
                  key={engagement.value}
                  as="button"
                  type="button"
                  textAlign="left"
                  w="100%"
                  bg="white"
                  border="1px solid"
                  borderColor={selected ? "accent.500" : "cream.300"}
                  borderTopWidth="3px"
                  borderTopColor={selected ? "accent.500" : "cream.300"}
                  borderRadius="6px"
                  p={{ base: 6, md: 8 }}
                  boxShadow={
                    selected
                      ? "0 16px 42px rgba(46, 42, 40, 0.10)"
                      : "0 8px 28px rgba(46, 42, 40, 0.04)"
                  }
                  transition="all 160ms ease"
                  cursor="pointer"
                  onClick={() => selectEngagement(engagement.value)}
                  _hover={{
                    borderColor: "accent.500",
                    boxShadow: "0 16px 42px rgba(46, 42, 40, 0.08)",
                    transform: "translateY(-2px)",
                  }}
                  _focusVisible={{
                    outline: "2px solid",
                    outlineColor: "accent.500",
                    outlineOffset: "3px",
                  }}
                >
                  <HStack justify="space-between" align="start">
                    <HStack align="start" spacing={4}>
                      <Box
                        w="44px"
                        h="44px"
                        flexShrink={0}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="1px solid"
                        borderColor={selected ? "accent.500" : "cream.400"}
                        color={selected ? "accent.600" : "taupe.600"}
                        borderRadius="4px"
                      >
                        <Icon size={19} />
                      </Box>
                      <Box>
                        <Text
                          fontSize="10px"
                          fontWeight="800"
                          letterSpacing="0.14em"
                          color="accent.600"
                          textTransform="uppercase"
                        >
                          {engagement.eyebrow}
                        </Text>
                        <Heading
                          mt={1.5}
                          fontSize={{ base: "xl", md: "2xl" }}
                          fontWeight="500"
                          color="brand.500"
                        >
                          {engagement.title}
                        </Heading>
                      </Box>
                    </HStack>

                    <Box
                      w="25px"
                      h="25px"
                      border="1px solid"
                      borderColor={selected ? "brand.500" : "cream.400"}
                      bg={selected ? "brand.500" : "transparent"}
                      color="white"
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      {selected && <Check size={14} />}
                    </Box>
                  </HStack>

                  <Text mt={6} color="taupe.600" fontSize="sm" lineHeight="1.8">
                    {engagement.description}
                  </Text>

                  <Stack spacing={2} mt={6}>
                    {engagement.points.map((point) => (
                      <HStack key={point} spacing={2.5}>
                        <Check size={14} color="var(--chakra-colors-accent-600)" />
                        <Text fontSize="sm" color="charcoal.700">
                          {point}
                        </Text>
                      </HStack>
                    ))}
                  </Stack>
                </Box>
              );
            })}
          </SimpleGrid>

          {selectedEngagement && (
            <Box borderTop="1px solid" borderColor="cream.300" pt={9} maxW="820px">
              <HStack align="start" spacing={4} mb={5}>
                <Text
                  fontSize="xs"
                  fontWeight="800"
                  letterSpacing="0.14em"
                  color="accent.600"
                  pt={1}
                >
                  03
                </Text>
                <Box>
                  <Heading fontSize="xl" fontWeight="500" color="brand.500">
                    A little more context
                  </Heading>
                  <Text mt={1} fontSize="sm" color="taupe.600">
                    Optional. This helps the Springboard team understand where
                    you're starting from.
                  </Text>
                </Box>
              </HStack>

              <Box ml={{ base: 0, md: 10 }}>
                <Text fontSize="sm" fontWeight="700" color="charcoal.800" mb={2}>
                  {selectedEngagement.contextLabel}
                </Text>
                <Textarea
                  value={context}
                  onChange={(event) => {
                    setContext(event.target.value);
                    if (error) setError("");
                  }}
                  placeholder={selectedEngagement.contextPlaceholder}
                  minH="130px"
                  resize="vertical"
                  maxLength={2000}
                />
                <Text mt={1.5} textAlign="right" fontSize="11px" color="taupe.500">
                  {context.length}/2000
                </Text>
              </Box>
            </Box>
          )}

          <HStack
            justify="space-between"
            align={{ base: "stretch", md: "center" }}
            flexDirection={{ base: "column", md: "row" }}
            spacing={5}
            pt={2}
          >
            <Text fontSize="xs" color="taupe.500" lineHeight="1.7" maxW="620px">
              Your engagement will enter Springboard's verification process
              after you submit it. Access to engagement features begins after
              approval.
            </Text>

            <Button
              h="48px"
              px={7}
              flexShrink={0}
              rightIcon={<ArrowRight size={17} />}
              isDisabled={!selectedType}
              isLoading={submitting}
              loadingText="Saving"
              onClick={handleSubmit}
            >
              Continue with {selectedEngagement?.eyebrow || "Selection"}
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}

function PendingVerification({ engagement, onContinue }) {
  const title =
    engagement.engagementType === "HIRING_TALENT_SEARCH"
      ? "Hiring & Talent Search"
      : "Outplacement Support";

  return (
    <Box minH="100vh" bg="cream.100" color="charcoal.800">
      <Box
        borderBottom="1px solid"
        borderColor="cream.300"
        bg="rgba(254,253,252,0.96)"
      >
        <Container maxW="1180px" px={{ base: 5, md: 8 }} py={4}>
          <HStack>
            <BrandMark />
            <BrandWordmark />
          </HStack>
        </Container>
      </Box>

      <Container maxW="760px" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
        <VStack spacing={7} textAlign="center">
          <Box
            w="68px"
            h="68px"
            border="1px solid"
            borderColor="accent.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="accent.600"
            borderRadius="50%"
          >
            <CheckCircle2 size={31} />
          </Box>

          <Text textStyle="overline" color="accent.600">
            Engagement submitted
          </Text>

          <Heading
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="500"
            fontStyle="italic"
            lineHeight="1.1"
            color="brand.500"
          >
            You're on your way.
          </Heading>

          <Text maxW="620px" color="taupe.600" fontSize={{ base: "md", md: "lg" }} lineHeight="1.85">
            Your <strong>{title}</strong> engagement has been submitted and is
            now awaiting Springboard verification.
          </Text>

          <Box
            w="100%"
            maxW="620px"
            bg="white"
            border="1px solid"
            borderColor="cream.300"
            borderRadius="6px"
            p={{ base: 5, md: 7 }}
            textAlign="left"
          >
            <Text textStyle="overline" color="taupe.500">
              Current status
            </Text>

            <HStack mt={3} justify="space-between">
              <Text fontFamily="heading" fontSize="xl" color="brand.500">
                Pending Verification
              </Text>

              <Box
                px={3}
                py={1}
                bg="warning.50"
                border="1px solid"
                borderColor="accent.200"
                color="accent.700"
                borderRadius="2px"
                fontSize="10px"
                fontWeight="800"
                letterSpacing="0.08em"
              >
                UNDER REVIEW
              </Box>
            </HStack>

            <Text mt={3} fontSize="sm" color="taupe.600" lineHeight="1.7">
              Springboard will review your company and engagement details.
              Engagement features become available after approval.
            </Text>
          </Box>

          <Button
            h="48px"
            px={7}
            rightIcon={<ArrowRight size={17} />}
            onClick={onContinue}
          >
            Continue to Employer Workspace
          </Button>

          <Text fontSize="11px" color="taupe.500">
            Your company account remains active while the engagement is being reviewed.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
