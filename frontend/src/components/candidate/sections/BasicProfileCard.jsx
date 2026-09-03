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

function BasicProfileCard({ profile, onEdit }) {
  const hasProfile =
    profile?.fullName ||
    profile?.phone ||
    profile?.city ||
    profile?.stateCountry;

  return (
    <Card>
      <CardHeader>
        <Flex justify="space-between" align="flex-start" gap={4}>
          <Box>
            <Heading size="md">Basic Profile</Heading>

            <Text color="gray.500" fontSize="sm" mt={1}>
              Your private identity and contact details
            </Text>
          </Box>

          <Button size="sm" variant="outline" onClick={onEdit}>
            Edit
          </Button>
        </Flex>
      </CardHeader>

      <CardBody pt={0}>
        {!hasProfile ? (
          <Stack spacing={4}>
            <Text color="gray.500">
              Complete your basic profile to get started.
            </Text>

            <Button
              alignSelf="flex-start"
              size="sm"
              colorScheme="blue"
              onClick={onEdit}
            >
              Complete profile
            </Button>
          </Stack>
        ) : (
          <Stack spacing={4}>
            <Box>
              <Text
                fontSize="xs"
                fontWeight="600"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Name
              </Text>

              <Text mt={1} fontWeight="600">
                {profile.fullName || "Not provided"}
              </Text>
            </Box>

            <Box>
              <Text
                fontSize="xs"
                fontWeight="600"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Location
              </Text>

              <Text mt={1}>
                {[profile.city, profile.stateCountry]
                  .filter(Boolean)
                  .join(", ") || "Not provided"}
              </Text>
            </Box>

            <Box>
              <Text
                fontSize="xs"
                fontWeight="600"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Employment
              </Text>

              <Box mt={1}>
                {profile.currentlyEmployed === true && (
                  <Badge colorScheme="green">Currently employed</Badge>
                )}

                {profile.currentlyEmployed === false && (
                  <Badge colorScheme="orange">Not currently employed</Badge>
                )}

                {profile.currentlyEmployed == null && (
                  <Text color="gray.500">Not provided</Text>
                )}
              </Box>
            </Box>
          </Stack>
        )}
      </CardBody>
    </Card>
  );
}

export default BasicProfileCard;
