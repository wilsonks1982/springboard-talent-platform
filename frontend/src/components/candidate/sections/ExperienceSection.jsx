import React, { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FiBriefcase, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

function formatDate(date) {
  if (!date) {
    return "";
  }

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

function getDateRange(experience) {
  const start = formatDate(experience.startDate);

  const end = experience.current ? "Present" : formatDate(experience.endDate);

  if (!start && !end) {
    return "";
  }

  return `${start} — ${end}`;
}

export default function ExperienceSection({
  experiences = [],
  onAdd,
  onEdit,
  onDelete,
}) {
  const [experienceToDelete, setExperienceToDelete] = useState(null);

  const cancelRef = useRef();

  function requestDelete(experience) {
    setExperienceToDelete(experience);
  }

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="2xl"
      p={{ base: 5, md: 7 }}
    >
      <Flex align="center" justify="space-between" mb={6}>
        <Box>
          <Text fontSize="lg" fontWeight="700" color="gray.800">
            Experience
          </Text>

          <Text fontSize="sm" color="gray.500" mt={1}>
            Your professional journey
          </Text>
        </Box>

        <Button
          leftIcon={<FiPlus />}
          colorScheme="purple"
          variant="ghost"
          size="sm"
          onClick={onAdd}
        >
          Add experience
        </Button>
      </Flex>

      {experiences.length === 0 ? (
        <Box
          border="1px dashed"
          borderColor="gray.300"
          borderRadius="xl"
          p={8}
          textAlign="center"
        >
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w="48px"
            h="48px"
            borderRadius="xl"
            bg="purple.50"
            color="purple.500"
            mb={3}
          >
            <FiBriefcase />
          </Box>

          <Text fontWeight="600" color="gray.700">
            Tell us about your experience
          </Text>

          <Text fontSize="sm" color="gray.500" mt={1} mb={4}>
            Add your professional experience to build your career story.
          </Text>

          <Button
            leftIcon={<FiPlus />}
            colorScheme="purple"
            size="sm"
            onClick={onAdd}
          >
            Add experience
          </Button>
        </Box>
      ) : (
        <VStack align="stretch" spacing={0}>
          {experiences.map((experience, index) => (
            <Flex
              key={experience.id}
              position="relative"
              pb={index === experiences.length - 1 ? 0 : 7}
              mb={index === experiences.length - 1 ? 0 : 7}
            >
              {/* Timeline */}
              <Box w="40px" flexShrink={0} position="relative">
                <Box
                  w="12px"
                  h="12px"
                  borderRadius="full"
                  bg="purple.500"
                  mt={1}
                  position="relative"
                  zIndex="2"
                />

                {index !== experiences.length - 1 && (
                  <Box
                    position="absolute"
                    left="5px"
                    top="13px"
                    bottom="-28px"
                    w="2px"
                    bg="gray.100"
                  />
                )}
              </Box>

              <Box flex="1" minW="0">
                <Flex justify="space-between" align="flex-start" gap={4}>
                  <Box>
                    <Text fontWeight="700" color="gray.800">
                      {experience.jobTitle}
                    </Text>

                    <Text
                      fontSize="sm"
                      fontWeight="500"
                      color="purple.600"
                      mt={1}
                    >
                      {experience.companyName}
                    </Text>

                    <HStack spacing={2} mt={1} flexWrap="wrap">
                      <Text fontSize="xs" color="gray.400">
                        {getDateRange(experience)}
                      </Text>

                      {experience.current && (
                        <Badge
                          colorScheme="green"
                          variant="subtle"
                          borderRadius="full"
                          px={2}
                          fontSize="10px"
                          textTransform="none"
                        >
                          Current
                        </Badge>
                      )}
                    </HStack>
                  </Box>

                  <HStack spacing={1}>
                    <IconButton
                      aria-label="Edit experience"
                      icon={<FiEdit2 />}
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(experience)}
                    />

                    <IconButton
                      aria-label="Delete experience"
                      icon={<FiTrash2 />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => requestDelete(experience)}
                    />
                  </HStack>
                </Flex>

                {experience.description && (
                  <Text fontSize="sm" color="gray.600" lineHeight="1.7" mt={3}>
                    {experience.description}
                  </Text>
                )}
              </Box>
            </Flex>
          ))}
        </VStack>
      )}
      <AlertDialog
        isOpen={Boolean(experienceToDelete)}
        leastDestructiveRef={cancelRef}
        onClose={() => setExperienceToDelete(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="2xl">
            <AlertDialogHeader fontSize="lg" fontWeight="700">
              Delete experience?
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color="gray.600">
                This will permanently remove your experience at{" "}
                <Text as="span" fontWeight="600" color="gray.800">
                  {experienceToDelete?.companyName}
                </Text>
                .
              </Text>

              <Text fontSize="sm" color="gray.500" mt={2}>
                This action cannot be undone.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter gap={3}>
              <Button
                ref={cancelRef}
                variant="ghost"
                onClick={() => setExperienceToDelete(null)}
              >
                Cancel
              </Button>

              <Button
                colorScheme="red"
                onClick={async () => {
                  const experience = experienceToDelete;

                  setExperienceToDelete(null);

                  await onDelete(experience);
                }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
