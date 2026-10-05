import React, { useMemo } from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
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

/* =============================================================
   PROFESSIONAL SNAPSHOT

   Springboard professional positioning section.

   Displays:
   - Career summary
   - Primary industry
   - Core skills
   - Completion state

   Existing data and callback contracts preserved.
============================================================= */

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
      borderColor="cream.300"
      borderRadius="6px"
      boxShadow="0 5px 20px rgba(46, 42, 40, 0.035)"
      overflow="hidden"
    >
      <FlexHeader onEdit={onEdit} hasSnapshot={hasSnapshot} />

      <Divider borderColor="cream.300" />

      {!hasSnapshot ? (
        <EmptySnapshotState onEdit={onEdit} />
      ) : (
        <Box
          p={{
            base: 5,
            md: 7,
          }}
        >
          <SimpleGrid
            columns={{
              base: 1,
              lg: 3,
            }}
            spacing={{
              base: 7,
              lg: 8,
            }}
          >
            {/* =================================================
                CAREER SUMMARY
            ================================================== */}

            <Box
              gridColumn={{
                base: "auto",
                lg: "span 2",
              }}
            >
              <SectionLabel icon={FiStar} label="CAREER SUMMARY" />

              <Text
                mt={4}
                color="charcoal.700"
                fontSize={{
                  base: "sm",
                  md: "md",
                }}
                lineHeight="1.8"
                maxW="760px"
                noOfLines={{
                  base: 7,
                  md: 6,
                }}
              >
                {careerSummary?.summary ||
                  "Add a concise professional summary that explains your experience, strengths and career direction."}
              </Text>

              {careerSummary?.summary && (
                <Text mt={3} fontSize="10px" color="taupe.500">
                  {wordCount(careerSummary.summary)} words
                </Text>
              )}
            </Box>

            {/* =================================================
                PROFESSIONAL FOCUS
            ================================================== */}

            <Stack
              spacing={7}
              borderLeft={{
                base: "0",
                lg: "1px solid",
              }}
              borderColor="cream.300"
              pl={{
                base: 0,
                lg: 7,
              }}
              pt={{
                base: 5,
                lg: 0,
              }}
              borderTop={{
                base: "1px solid",
                lg: "0",
              }}
            >
              {/* Primary industry */}

              <SnapshotItem
                icon={FiTarget}
                label="PRIMARY INDUSTRY"
                value={selectedIndustry?.name}
                fallback="Not selected"
              />

              {/* Core skills */}

              <Box>
                <SectionLabel icon={FiBriefcase} label="CORE SKILLS" />

                {selectedSkills.length > 0 ? (
                  <Wrap mt={4} spacing={2}>
                    {selectedSkills.map((skill) => (
                      <WrapItem key={skill.id}>
                        <Tag
                          size="sm"
                          borderRadius="3px"
                          bg="cream.100"
                          border="1px solid"
                          borderColor="cream.300"
                          color="charcoal.700"
                          px={3}
                          py={1.5}
                          fontWeight="600"
                          fontSize="11px"
                        >
                          {skill.name}
                        </Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                ) : (
                  <Text mt={4} fontSize="sm" color="taupe.400">
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

/* =============================================================
   SECTION LABEL
============================================================= */

function SectionLabel({ icon, label }) {
  return (
    <HStack spacing={2} align="center">
      <Icon as={icon} boxSize="15px" color="accent.600" />

      <Text
        fontSize="9px"
        fontWeight="800"
        color="taupe.500"
        letterSpacing="0.14em"
      >
        {label}
      </Text>
    </HStack>
  );
}

/* =============================================================
   HEADER
============================================================= */

function FlexHeader({ onEdit, hasSnapshot }) {
  return (
    <Box
      p={{
        base: 5,
        md: 6,
      }}
    >
      <HStack
        justify="space-between"
        align={{
          base: "flex-start",
          sm: "center",
        }}
        spacing={4}
      >
        {/* Identity */}

        <HStack align="flex-start" spacing={3}>
          <Box
            mt={1}
            w="38px"
            h="38px"
            borderRadius="4px"
            bg="accent.50"
            border="1px solid"
            borderColor="accent.200"
            color="accent.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Icon as={FiStar} boxSize="17px" />
          </Box>

          <Box>
            <HStack spacing={3} flexWrap="wrap">
              <Text
                fontFamily="heading"
                fontSize={{
                  base: "lg",
                  md: "xl",
                }}
                fontWeight="500"
                color="brand.500"
                lineHeight="1.25"
              >
                Professional Snapshot
              </Text>

              {hasSnapshot && (
                <HStack spacing={1.5} align="center">
                  <Box w="6px" h="6px" borderRadius="full" bg="success.500" />

                  <Text
                    fontSize="9px"
                    fontWeight="800"
                    color="success.700"
                    letterSpacing="0.1em"
                  >
                    COMPLETE
                  </Text>
                </HStack>
              )}
            </HStack>

            <Text mt={1} fontSize="sm" color="taupe.500" lineHeight="1.5">
              The professional story behind your profile.
            </Text>
          </Box>
        </HStack>

        {/* Edit */}

        <Button
          size="sm"
          variant="outlineGold"
          borderRadius="4px"
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

/* =============================================================
   SNAPSHOT ITEM
============================================================= */

function SnapshotItem({ icon, label, value, fallback }) {
  return (
    <Box>
      <SectionLabel icon={icon} label={label} />

      <Text
        mt={4}
        fontFamily={value ? "heading" : undefined}
        fontSize={value ? "lg" : "sm"}
        fontWeight={value ? "500" : "400"}
        color={value ? "brand.500" : "taupe.400"}
        lineHeight="1.4"
      >
        {value || fallback}
      </Text>
    </Box>
  );
}

/* =============================================================
   EMPTY STATE
============================================================= */

function EmptySnapshotState({ onEdit }) {
  return (
    <Box
      px={{
        base: 5,
        md: 7,
      }}
      py={{
        base: 9,
        md: 11,
      }}
    >
      <Stack
        align="center"
        textAlign="center"
        spacing={5}
        maxW="600px"
        mx="auto"
      >
        {/* Icon */}

        <Box
          w="48px"
          h="48px"
          borderRadius="4px"
          bg="accent.50"
          border="1px solid"
          borderColor="accent.200"
          color="accent.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FiTarget} boxSize="20px" />
        </Box>

        {/* Message */}

        <Box>
          <Text
            fontFamily="heading"
            fontSize="lg"
            fontWeight="500"
            color="brand.500"
          >
            Tell recruiters what you do best
          </Text>

          <Text
            mt={2}
            fontSize="sm"
            color="taupe.600"
            lineHeight="1.7"
            maxW="520px"
          >
            Add your career summary, primary industry and core skills to make
            your professional direction immediately clear.
          </Text>
        </Box>

        {/* CTA */}

        <Button
          size="sm"
          variant="solid"
          borderRadius="4px"
          leftIcon={<FiPlus />}
          onClick={onEdit}
        >
          Build professional snapshot
        </Button>
      </Stack>
    </Box>
  );
}

/* =============================================================
   WORD COUNT
============================================================= */

function wordCount(value) {
  return value?.trim() ? value.trim().split(/\s+/).length : 0;
}
