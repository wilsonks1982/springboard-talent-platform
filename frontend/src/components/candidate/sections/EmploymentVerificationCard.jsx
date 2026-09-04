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
import { FiCheckCircle, FiLock } from "react-icons/fi";

const STATUS_CONFIG = {
  NOT_VERIFIED: {
    label: "Not Verified",
    colorScheme: "gray",
  },
  PENDING: {
    label: "Verification Pending",
    colorScheme: "orange",
  },
  VERIFIED: {
    label: "Employment Verified",
    colorScheme: "green",
  },
  DISCREPANCY_FOUND: {
    label: "Discrepancy Found",
    colorScheme: "red",
  },
};

function DocumentStatus({ label, present }) {
  return (
    <Flex align="center" justify="space-between">
      <Text fontSize="sm" color="gray.700">
        {label}
      </Text>

      {present ? (
        <Badge colorScheme="green">Added</Badge>
      ) : (
        <Badge colorScheme="gray">Missing</Badge>
      )}
    </Flex>
  );
}

export default function EmploymentVerificationCard({ verification, onEdit }) {
  const status =
    STATUS_CONFIG[verification?.employmentVerificationStatus || "NOT_VERIFIED"];

  const documents = [
    {
      label: "Last Increment Letter",
      present: Boolean(verification?.lastIncrementLetterUrl),
    },
    {
      label: "Variable Pay Letter",
      present: Boolean(verification?.variablePayLetterUrl),
    },
    {
      label: "Relieving Letter",
      present: Boolean(verification?.relievingLetterUrl),
    },
    {
      label: "Other Supporting Document",
      present: Boolean(verification?.otherSupportingDocumentUrl),
    },
  ];

  const requiredDocuments = documents.slice(0, 2);

  const requiredComplete = requiredDocuments.every(
    (document) => document.present,
  );

  return (
    <Card borderWidth="1px">
      <CardHeader pb={2}>
        <Flex align="center" justify="space-between" gap={3}>
          <Flex align="center" gap={2}>
            <FiLock />

            <Heading size="sm">Employment Verification</Heading>
          </Flex>

          <Badge colorScheme={status.colorScheme} whiteSpace="nowrap">
            {status.label}
          </Badge>
        </Flex>

        <Text mt={2} fontSize="xs" color="gray.500">
          Private to Springboard. Never shared outside the platform without your
          consent.
        </Text>
      </CardHeader>

      <CardBody pt={3}>
        <Stack spacing={3}>
          <Box>
            <Text fontSize="xs" fontWeight="semibold" color="gray.500" mb={2}>
              SUPPORTING DOCUMENTS
            </Text>

            <Stack spacing={2}>
              {documents.map((document) => (
                <DocumentStatus
                  key={document.label}
                  label={document.label}
                  present={document.present}
                />
              ))}
            </Stack>
          </Box>

          <Flex
            align="center"
            justify="space-between"
            pt={2}
            borderTopWidth="1px"
            borderColor="gray.100"
          >
            <Box>
              <Text fontSize="sm" fontWeight="medium">
                Verification readiness
              </Text>

              <Text fontSize="xs" color="gray.500">
                {requiredComplete
                  ? "Required documents added"
                  : "Required documents still needed"}
              </Text>
            </Box>

            <Button size="sm" variant="outline" onClick={onEdit}>
              Manage
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}
