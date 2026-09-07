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
  IconButton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FiAward, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

function AchievementItem({ achievement, onEdit, onDelete }) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.100"
      borderRadius="xl"
      p={{ base: 4, md: 5 }}
      transition="all 0.2s ease"
      _hover={{
        borderColor: "purple.100",
        boxShadow: "sm",
        transform: "translateY(-1px)",
      }}
    >
      <Flex
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap={4}
      >
        <HStack align="flex-start" spacing={4} minW={0}>
          <Box
            flexShrink={0}
            w="44px"
            h="44px"
            borderRadius="lg"
            bg="purple.50"
            color="purple.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <FiAward size={20} />
          </Box>

          <Box minW={0}>
            <HStack spacing={2} flexWrap="wrap">
              <Text
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="700"
                color="gray.800"
              >
                {achievement.title}
              </Text>

              <Badge
                colorScheme="purple"
                variant="subtle"
                borderRadius="full"
                fontSize="10px"
                px={2}
              >
                Achievement
              </Badge>
            </HStack>

            {achievement.description && (
              <Text
                fontSize="sm"
                lineHeight="1.7"
                color="gray.500"
                mt={2}
                whiteSpace="pre-wrap"
              >
                {achievement.description}
              </Text>
            )}
          </Box>
        </HStack>

        <HStack spacing={1} flexShrink={0}>
          <IconButton
            aria-label="Edit achievement"
            icon={<FiEdit2 />}
            size="sm"
            variant="ghost"
            colorScheme="purple"
            onClick={() => onEdit(achievement)}
          />

          <IconButton
            aria-label="Delete achievement"
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={() => onDelete(achievement)}
          />
        </HStack>
      </Flex>
    </Box>
  );
}

export default function AchievementsSection({
  achievements = [],
  onAdd,
  onEdit,
  onDelete,
}) {
  const [deleteTarget, setDeleteTarget] = useState(null);

  const cancelRef = useRef();

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="2xl"
      p={{ base: 5, md: 7 }}
    >
      {/* Header */}
      <Flex
        align={{ base: "flex-start", sm: "center" }}
        justify="space-between"
        gap={4}
        mb={6}
      >
        <HStack align="flex-start" spacing={3}>
          <Box
            flexShrink={0}
            w="42px"
            h="42px"
            borderRadius="xl"
            bg="purple.50"
            color="purple.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <FiAward size={20} />
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="700" color="gray.800">
              Achievements
            </Text>

            <Text fontSize="sm" color="gray.500" mt={1}>
              Showcase the impact and milestones that set you apart
            </Text>
          </Box>
        </HStack>

        <Button
          size="sm"
          variant="outline"
          colorScheme="purple"
          leftIcon={<FiPlus />}
          onClick={onAdd}
          flexShrink={0}
        >
          Add achievement
        </Button>
      </Flex>

      {/* Content */}
      {achievements.length === 0 ? (
        <Box
          border="1px dashed"
          borderColor="gray.300"
          borderRadius="xl"
          px={6}
          py={9}
          textAlign="center"
          bg="gray.50"
        >
          <Box
            mx="auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="56px"
            h="56px"
            borderRadius="xl"
            bg="white"
            color="purple.500"
            border="1px solid"
            borderColor="purple.100"
            mb={4}
          >
            <FiAward size={24} />
          </Box>

          <Text fontWeight="700" color="gray.700">
            No achievements yet
          </Text>

          <Text
            fontSize="sm"
            color="gray.500"
            mt={2}
            mb={5}
            maxW="420px"
            mx="auto"
          >
            Awards, milestones and measurable accomplishments can help employers
            understand the impact you've made.
          </Text>

          <Button
            size="sm"
            colorScheme="purple"
            leftIcon={<FiPlus />}
            onClick={onAdd}
          >
            Add your first achievement
          </Button>
        </Box>
      ) : (
        <Stack spacing={0}>
          <Flex align="center" justify="space-between" mb={4}>
            <HStack spacing={2}>
              <Text fontSize="sm" fontWeight="600" color="gray.700">
                Your accomplishments
              </Text>

              <Badge
                colorScheme="purple"
                variant="subtle"
                borderRadius="full"
                px={2}
              >
                {achievements.length}
              </Badge>
            </HStack>

            <Text
              fontSize="xs"
              color="gray.400"
              display={{ base: "none", sm: "block" }}
            >
              Proof of professional impact
            </Text>
          </Flex>

          <Divider mb={4} />

          <VStack align="stretch" spacing={3}>
            {achievements.map((achievement) => (
              <AchievementItem
                key={achievement.id}
                achievement={achievement}
                onEdit={onEdit}
                onDelete={() => setDeleteTarget(achievement)}
              />
            ))}
          </VStack>
        </Stack>
      )}

      {/* Delete confirmation */}
      <AlertDialog
        isOpen={Boolean(deleteTarget)}
        leastDestructiveRef={cancelRef}
        onClose={() => setDeleteTarget(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="2xl">
            <AlertDialogHeader>Delete achievement?</AlertDialogHeader>

            <AlertDialogBody>
              <Text color="gray.600">
                {deleteTarget?.title
                  ? `"${deleteTarget.title}" will be removed from your profile.`
                  : "This achievement will be removed from your profile."}
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter gap={3}>
              <Button
                ref={cancelRef}
                variant="ghost"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </Button>

              <Button
                colorScheme="red"
                onClick={async () => {
                  const id = deleteTarget.id;

                  setDeleteTarget(null);

                  await onDelete(id);
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
