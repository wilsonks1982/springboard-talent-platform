import React from "react";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiBriefcase } from "react-icons/fi";

export default function ExperienceInsights({ analysis }) {
  if (!analysis) {
    return null;
  }

  const { yearsExperience = 0, currentTitle, currentCompany } = analysis;

  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="2xl"
      p={{ base: 5, md: 7 }}
      boxShadow="sm"
      mb={6}
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap={4}
        mb={7}
      >
        <HStack spacing={3}>
          <Box
            w="42px"
            h="42px"
            borderRadius="xl"
            bg="purple.50"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FiBriefcase} boxSize={5} color="purple.600" />
          </Box>

          <Box>
            <Text
              fontSize="xs"
              fontWeight="800"
              letterSpacing="0.08em"
              color="purple.600"
            >
              PROFESSIONAL SNAPSHOT
            </Text>

            <Text
              mt={1}
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="700"
              color="gray.800"
            >
              Your career at a glance
            </Text>

            <Text mt={1} fontSize="sm" color="gray.500">
              Experience and current role derived from your career history.
            </Text>
          </Box>
        </HStack>
      </Flex>

      {/* Main metrics */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "center" }}
        gap={{ base: 6, md: 0 }}
      >
        {/* Experience */}
        <Flex flex="1" align="center" minW={0}>
          <Box mr={5}>
            <Text
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="800"
              lineHeight="1"
              letterSpacing="-0.04em"
              color="gray.800"
            >
              {Number(yearsExperience).toFixed(1)}
            </Text>
          </Box>

          <VStack align="flex-start" spacing={0.5}>
            <Text
              fontSize="xs"
              fontWeight="800"
              letterSpacing="0.08em"
              color="gray.400"
            >
              YEARS
            </Text>

            <Text fontSize="md" fontWeight="600" color="gray.700">
              Professional experience
            </Text>

            <Text fontSize="xs" color="gray.400">
              Based on employment history
            </Text>
          </VStack>
        </Flex>

        {/* Divider */}
        <Divider
          orientation="vertical"
          display={{ base: "none", md: "block" }}
          h="72px"
          mx={8}
          borderColor="gray.100"
        />

        <Divider
          display={{ base: "block", md: "none" }}
          borderColor="gray.100"
        />

        {/* Current role */}
        <Box flex="1" minW={0}>
          <Text
            fontSize="xs"
            fontWeight="800"
            letterSpacing="0.08em"
            color="gray.400"
            mb={2}
          >
            CURRENT ROLE
          </Text>

          {currentTitle ? (
            <Text
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="700"
              color="gray.800"
              noOfLines={2}
            >
              {currentTitle}
            </Text>
          ) : (
            <Text fontSize="sm" color="gray.400">
              Add your current role
            </Text>
          )}

          {currentCompany && (
            <Text mt={1} fontSize="sm" fontWeight="500" color="gray.500">
              {currentCompany}
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
