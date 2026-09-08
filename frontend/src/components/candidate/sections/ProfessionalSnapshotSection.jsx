import React, { useMemo } from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { FiBriefcase, FiEdit3, FiPlus, FiStar, FiTarget } from "react-icons/fi";

export default function ProfessionalSnapshotSection({
  careerSummary,
  industries,
  selectedIndustryIds,
  skills,
  selectedSkillIds,
  onEdit,
}) {
  const selectedIndustry = useMemo(
    () =>
      industries.find((industry) => industry.id === selectedIndustryIds?.[0]),
    [industries, selectedIndustryIds],
  );

  const selectedSkills = useMemo(
    () => skills.filter((skill) => selectedSkillIds?.includes(skill.id)),
    [skills, selectedSkillIds],
  );

  const hasSnapshot =
    Boolean(careerSummary?.summary) ||
    Boolean(selectedIndustryIds?.length) ||
    Boolean(selectedSkillIds?.length);

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="2xl"
      boxShadow="0 4px 20px rgba(15, 23, 42, 0.04)"
      overflow="hidden"
    >
      <FlexHeader onEdit={onEdit} hasSnapshot={hasSnapshot} />

      <Divider />

      {!hasSnapshot ? (
        <EmptySnapshotState onEdit={onEdit} />
      ) : (
        <Box p={{ base: 5, md: 7 }}>
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
            {/* Career Summary */}
            <Box gridColumn={{ base: "auto", lg: "span 2" }}>
              <HStack spacing={2} mb={3}>
                <Icon as={FiStar} color="purple.500" boxSize={4} />

                <Text
                  fontSize="xs"
                  fontWeight="800"
                  color="gray.500"
                  letterSpacing="0.08em"
                >
                  CAREER SUMMARY
                </Text>
              </HStack>

              <Text
                color="gray.700"
                fontSize={{ base: "sm", md: "md" }}
                lineHeight="1.8"
                noOfLines={{ base: 6, md: 5 }}
              >
                {careerSummary?.summary ||
                  "Add a concise professional summary that explains your experience, strengths and career direction."}
              </Text>

              {careerSummary?.summary && (
                <Text mt={3} fontSize="xs" color="gray.400">
                  {wordCount(careerSummary.summary)} words
                </Text>
              )}
            </Box>

            {/* Professional Focus */}
            <Stack spacing={5}>
              <SnapshotItem
                icon={FiTarget}
                label="PRIMARY INDUSTRY"
                value={selectedIndustry?.name}
                fallback="Not selected"
              />

              <Box>
                <HStack spacing={2} mb={3}>
                  <Icon as={FiBriefcase} color="purple.500" boxSize={4} />

                  <Text
                    fontSize="xs"
                    fontWeight="800"
                    color="gray.500"
                    letterSpacing="0.08em"
                  >
                    CORE SKILLS
                  </Text>
                </HStack>

                {selectedSkills.length > 0 ? (
                  <Wrap spacing={2}>
                    {selectedSkills.map((skill) => (
                      <WrapItem key={skill.id}>
                        <Tag
                          size="sm"
                          borderRadius="full"
                          colorScheme="purple"
                          px={3}
                          py={1.5}
                          fontWeight="600"
                        >
                          {skill.name}
                        </Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                ) : (
                  <Text fontSize="sm" color="gray.400">
                    No skills selected yet.
                  </Text>
                )}
              </Box>
            </Stack>
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
}

function wordCount(value) {
  return value?.trim() ? value.trim().split(/\s+/).length : 0;
}

function FlexHeader({ onEdit, hasSnapshot }) {
  return (
    <Box p={{ base: 5, md: 6 }}>
      <HStack
        justify="space-between"
        align={{ base: "flex-start", sm: "center" }}
        spacing={4}
      >
        <HStack align="flex-start" spacing={3}>
          <Box
            mt={1}
            w="40px"
            h="40px"
            borderRadius="xl"
            bg="purple.50"
            color="purple.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Icon as={FiStar} boxSize={5} />
          </Box>

          <Box>
            <HStack spacing={2} flexWrap="wrap">
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="800"
                color="gray.900"
              >
                Professional Snapshot
              </Text>

              {hasSnapshot && (
                <Badge
                  colorScheme="green"
                  borderRadius="full"
                  px={2}
                  fontSize="9px"
                >
                  COMPLETE
                </Badge>
              )}
            </HStack>

            <Text mt={1} fontSize="sm" color="gray.500">
              The professional story behind your profile.
            </Text>
          </Box>
        </HStack>

        <Button
          size="sm"
          variant="outline"
          colorScheme="purple"
          leftIcon={<FiEdit3 />}
          onClick={onEdit}
          flexShrink={0}
        >
          Edit
        </Button>
      </HStack>
    </Box>
  );
}

function SnapshotItem({ icon, label, value, fallback }) {
  return (
    <Box>
      <HStack spacing={2} mb={3}>
        <Icon as={icon} color="purple.500" boxSize={4} />

        <Text
          fontSize="xs"
          fontWeight="800"
          color="gray.500"
          letterSpacing="0.08em"
        >
          {label}
        </Text>
      </HStack>

      <Text
        fontSize="md"
        fontWeight="700"
        color={value ? "gray.800" : "gray.400"}
      >
        {value || fallback}
      </Text>
    </Box>
  );
}

function EmptySnapshotState({ onEdit }) {
  return (
    <Box px={{ base: 5, md: 7 }} py={{ base: 8, md: 10 }}>
      <Stack
        align="center"
        textAlign="center"
        spacing={4}
        maxW="560px"
        mx="auto"
      >
        <Box
          w="52px"
          h="52px"
          borderRadius="2xl"
          bg="purple.50"
          color="purple.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FiTarget} boxSize={6} />
        </Box>

        <Box>
          <Text fontSize="md" fontWeight="800" color="gray.800">
            Tell recruiters what you do best
          </Text>

          <Text mt={2} fontSize="sm" color="gray.500" lineHeight="1.7">
            Add your career summary, primary industry and core skills to make
            your professional direction immediately clear.
          </Text>
        </Box>

        <Button
          size="sm"
          colorScheme="purple"
          leftIcon={<FiPlus />}
          onClick={onEdit}
        >
          Build professional snapshot
        </Button>
      </Stack>
    </Box>
  );
}
