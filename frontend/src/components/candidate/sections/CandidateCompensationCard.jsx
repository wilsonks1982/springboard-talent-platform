import React from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

const VISIBILITY_LABELS = {
  HIDDEN: "Hidden",
  RANGE: "Range visible",
  EXACT: "Exact visible",
};

function formatExactCtc(value) {
  if (value == null) return "Not provided";

  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function CandidateCompensationCard({ compensation, onEdit }) {
  const hasCompensation =
    compensation?.currentCtc != null || compensation?.expectedCtc != null;

  const visibility = compensation?.compensationVisibility || "HIDDEN";

  return (
    <Card>
      <CardHeader>
        <Flex justify="space-between" align="flex-start" gap={4}>
          <Box>
            <Heading size="md">Compensation</Heading>
            <Text color="gray.500" fontSize="sm" mt={1}>
              Your compensation information is private by default
            </Text>
          </Box>

          <Button size="sm" variant="outline" onClick={onEdit}>
            Edit
          </Button>
        </Flex>
      </CardHeader>

      <CardBody pt={0}>
        {!hasCompensation ? (
          <Stack spacing={4}>
            <Text color="gray.500">
              Add your current and expected compensation.
            </Text>

            <Button
              alignSelf="flex-start"
              size="sm"
              colorScheme="blue"
              onClick={onEdit}
            >
              Add compensation
            </Button>
          </Stack>
        ) : (
          <Stack spacing={4}>
            <Flex justify="space-between" align="center">
              <Text fontSize="sm" color="gray.500">
                Visibility
              </Text>

              <Badge
                colorScheme={
                  visibility === "EXACT"
                    ? "green"
                    : visibility === "RANGE"
                      ? "blue"
                      : "gray"
                }
              >
                {VISIBILITY_LABELS[visibility]}
              </Badge>
            </Flex>

            <Box>
              <Text
                fontSize="xs"
                fontWeight="600"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Current CTC
              </Text>

              <Text mt={1} fontWeight="600">
                {formatExactCtc(compensation.currentCtc)}
              </Text>

              {compensation.currentCtcBand && (
                <Text fontSize="sm" color="gray.500" mt={1}>
                  {compensation.currentCtcBand}
                </Text>
              )}
            </Box>

            <Box>
              <Text
                fontSize="xs"
                fontWeight="600"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Expected CTC
              </Text>

              <Text mt={1} fontWeight="600">
                {formatExactCtc(compensation.expectedCtc)}
              </Text>

              {compensation.expectedCtcBand && (
                <Text fontSize="sm" color="gray.500" mt={1}>
                  {compensation.expectedCtcBand}
                </Text>
              )}
            </Box>
          </Stack>
        )}
      </CardBody>
    </Card>
  );
}

export default CandidateCompensationCard;
