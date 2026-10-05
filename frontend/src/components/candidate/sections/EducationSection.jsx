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
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  FiBookOpen,
  FiCheckCircle,
  FiEdit2,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

function getEducationMeta(education) {
  const values = [];

  if (education.fieldOfStudy) {
    values.push(education.fieldOfStudy);
  }

  if (education.yearOfPassing) {
    values.push(education.yearOfPassing);
  }

  return values.join(" · ");
}

function formatEducationLevel(level) {
  if (!level) {
    return null;
  }

  const labels = {
    HIGH_SCHOOL: "High School",
    DIPLOMA: "Diploma",
    BACHELOR: "Bachelor's",
    MASTER: "Master's",
    DOCTORATE: "Doctorate",
    OTHER: "Other",
  };

  return labels[level] || level;
}

function EducationItem({ item, onEdit, onDelete }) {
  const educationLevel = formatEducationLevel(item.educationLevel);
  const meta = getEducationMeta(item);

  return (
    <Box
      border="1px solid"
      borderColor="cream.300"
      borderRadius="6px"
      p={{ base: 4, md: 5 }}
      bg="white"
      transition="all 0.18s ease"
      _hover={{
        borderColor: "accent.300",
        boxShadow: "sm",
      }}
    >
      <Flex justify="space-between" align="flex-start" gap={4}>
        <HStack align="flex-start" spacing={4} minW={0}>
          {/* Education marker */}
          <Box
            flexShrink={0}
            w={{ base: "36px", md: "38px" }}
            h={{ base: "36px", md: "38px" }}
            border="1px solid"
            borderColor="accent.300"
            bg="cream.100"
            color="accent.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px"
          >
            <Icon as={FiBookOpen} boxSize={4} />
          </Box>

          <Box minW={0}>
            <Text
              fontFamily="heading"
              fontWeight="500"
              fontSize={{ base: "md", md: "lg" }}
              color="brand.500"
              lineHeight="1.4"
            >
              {item.degree || "Education"}
            </Text>

            <Text mt={1} fontSize="sm" fontWeight="600" color="accent.600">
              {item.institution}
            </Text>

            {meta && (
              <Text mt={1.5} fontSize="xs" color="taupe.600">
                {meta}
              </Text>
            )}

            {educationLevel && (
              <Badge
                mt={3}
                bg="cream.200"
                color="taupe.700"
                borderRadius="2px"
                px={2}
                py="2px"
                fontSize="9px"
                fontWeight="700"
                letterSpacing="0.06em"
                textTransform="uppercase"
              >
                {educationLevel}
              </Badge>
            )}
          </Box>
        </HStack>

        <HStack spacing={1} flexShrink={0}>
          <IconButton
            aria-label="Edit education"
            icon={<FiEdit2 />}
            size="sm"
            variant="ghost"
            color="brand.500"
            borderRadius="4px"
            _hover={{
              bg: "brand.50",
              color: "brand.600",
            }}
            onClick={() => onEdit(item)}
          />

          <IconButton
            aria-label="Delete education"
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            color="error.500"
            borderRadius="4px"
            _hover={{
              bg: "error.50",
              color: "error.600",
            }}
            onClick={() => onDelete(item)}
          />
        </HStack>
      </Flex>
    </Box>
  );
}

export default function EducationSection({
  education = [],
  onAdd,
  onEdit,
  onDelete,
}) {
  const [educationToDelete, setEducationToDelete] = useState(null);

  const cancelRef = useRef();

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="cream.300"
      borderRadius="6px"
      overflow="hidden"
      boxShadow="sm"
    >
      {/* Header */}
      <Box p={{ base: 5, md: 7 }}>
        <Flex
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
          gap={4}
        >
          <HStack spacing={3} align="flex-start">
            <Box
              w="34px"
              h="34px"
              border="1px solid"
              borderColor="accent.300"
              bg="cream.100"
              color="accent.600"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              borderRadius="4px"
            >
              <Icon as={FiBookOpen} boxSize={4} />
            </Box>

            <Box>
              <Text
                fontFamily="heading"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="500"
                color="brand.500"
                lineHeight="1.2"
              >
                Education
              </Text>

              <Text mt={1.5} fontSize="sm" color="taupe.600">
                Your academic background
              </Text>
            </Box>
          </HStack>

          <Button
            size="sm"
            variant="outlineGold"
            leftIcon={<FiPlus />}
            onClick={onAdd}
            flexShrink={0}
          >
            Add education
          </Button>
        </Flex>
      </Box>

      <Divider borderColor="cream.300" />

      {/* Empty state */}
      {education.length === 0 ? (
        <Box
          mx={{ base: 5, md: 7 }}
          my={{ base: 5, md: 7 }}
          py={10}
          px={5}
          textAlign="center"
          border="1px dashed"
          borderColor="cream.400"
          borderRadius="4px"
          bg="cream.50"
        >
          <Box
            mx="auto"
            w="42px"
            h="42px"
            border="1px solid"
            borderColor="accent.300"
            bg="white"
            color="accent.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px"
          >
            <Icon as={FiBookOpen} boxSize={5} />
          </Box>

          <Text
            mt={4}
            fontFamily="heading"
            fontSize="lg"
            fontWeight="500"
            color="brand.500"
          >
            Build your academic profile
          </Text>

          <Text
            mt={1.5}
            fontSize="sm"
            color="taupe.600"
            maxW="420px"
            mx="auto"
            lineHeight="1.7"
          >
            Add the education that shaped your knowledge and professional
            journey.
          </Text>

          <Button
            mt={5}
            size="sm"
            variant="solid"
            leftIcon={<FiPlus />}
            onClick={onAdd}
          >
            Add your first qualification
          </Button>
        </Box>
      ) : (
        <Box px={{ base: 5, md: 7 }} py={{ base: 6, md: 7 }}>
          <HStack mb={5} spacing={2} fontSize="xs" color="taupe.600">
            <Icon as={FiCheckCircle} boxSize={3.5} color="success.500" />

            <Text>
              {education.length}{" "}
              {education.length === 1 ? "qualification" : "qualifications"}{" "}
              added
            </Text>
          </HStack>

          <Stack spacing={3}>
            {education.map((item) => (
              <EducationItem
                key={item.id}
                item={item}
                onEdit={onEdit}
                onDelete={setEducationToDelete}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Delete confirmation */}
      <AlertDialog
        isOpen={Boolean(educationToDelete)}
        leastDestructiveRef={cancelRef}
        onClose={() => setEducationToDelete(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            borderRadius="6px"
            border="1px solid"
            borderColor="cream.300"
          >
            <AlertDialogHeader
              fontFamily="heading"
              fontSize="lg"
              fontWeight="500"
              color="brand.500"
            >
              Delete education?
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color="charcoal.700" lineHeight="1.7">
                This will permanently remove your{" "}
                <Text as="span" fontWeight="700" color="charcoal.800">
                  {educationToDelete?.degree}
                </Text>{" "}
                from your profile.
              </Text>

              <Text fontSize="sm" color="taupe.500" mt={2}>
                This action cannot be undone.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter gap={3}>
              <Button
                ref={cancelRef}
                variant="ghostBrand"
                onClick={() => setEducationToDelete(null)}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                onClick={async () => {
                  const item = educationToDelete;

                  setEducationToDelete(null);

                  await onDelete(item);
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
