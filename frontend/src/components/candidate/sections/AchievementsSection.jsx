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
      <Flex
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap={4}
      >
        <HStack align="flex-start" spacing={4} minW={0}>
          {/* Achievement marker */}
          <Box
            flexShrink={0}
            w="36px"
            h="36px"
            border="1px solid"
            borderColor="accent.300"
            bg="cream.100"
            color="accent.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px"
          >
            <FiAward size={17} />
          </Box>

          <Box minW={0}>
            <HStack spacing={2} flexWrap="wrap">
              <Text
                fontFamily="heading"
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="500"
                color="brand.500"
              >
                {achievement.title}
              </Text>

              <Badge
                bg="cream.200"
                color="taupe.700"
                borderRadius="2px"
                fontSize="9px"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
                px={2}
                py="2px"
              >
                Achievement
              </Badge>
            </HStack>

            {achievement.description && (
              <Text
                fontSize="sm"
                lineHeight="1.7"
                color="charcoal.700"
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
            color="brand.500"
            borderRadius="4px"
            _hover={{
              bg: "brand.50",
              color: "brand.600",
            }}
            onClick={() => onEdit(achievement)}
          />

          <IconButton
            aria-label="Delete achievement"
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            color="error.500"
            borderRadius="4px"
            _hover={{
              bg: "error.50",
              color: "error.600",
            }}
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
      borderColor="cream.300"
      borderRadius="6px"
      p={{ base: 5, md: 7 }}
      boxShadow="sm"
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
            w="34px"
            h="34px"
            border="1px solid"
            borderColor="accent.300"
            bg="cream.100"
            color="accent.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px"
          >
            <FiAward size={17} />
          </Box>

          <Box>
            <Text
              fontFamily="heading"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="500"
              color="brand.500"
              lineHeight="1.2"
            >
              Achievements
            </Text>

            <Text fontSize="sm" color="taupe.600" mt={1.5}>
              Showcase the impact and milestones that set you apart
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
          Add achievement
        </Button>
      </Flex>

      {/* Gold section rule */}
      <Box h="1px" bg="cream.300" mb={5} />

      {/* Content */}
      {achievements.length === 0 ? (
        <Box
          border="1px dashed"
          borderColor="cream.400"
          borderRadius="4px"
          px={6}
          py={9}
          textAlign="center"
          bg="cream.50"
        >
          <Box
            mx="auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="42px"
            h="42px"
            border="1px solid"
            borderColor="accent.300"
            bg="white"
            color="accent.600"
            borderRadius="4px"
            mb={4}
          >
            <FiAward size={19} />
          </Box>

          <Text
            fontFamily="heading"
            fontSize="lg"
            fontWeight="500"
            color="brand.500"
          >
            No achievements yet
          </Text>

          <Text
            fontSize="sm"
            lineHeight="1.7"
            color="taupe.600"
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
            variant="solid"
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
              <Text fontSize="sm" fontWeight="700" color="charcoal.800">
                Your accomplishments
              </Text>

              <Badge
                bg="cream.200"
                color="brand.500"
                borderRadius="2px"
                px={2}
                py="2px"
                fontSize="10px"
                fontWeight="700"
              >
                {achievements.length}
              </Badge>
            </HStack>

            <Text
              fontSize="xs"
              color="taupe.500"
              display={{ base: "none", sm: "block" }}
            >
              Proof of professional impact
            </Text>
          </Flex>

          <Divider borderColor="cream.300" mb={4} />

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
          <AlertDialogContent
            borderRadius="6px"
            border="1px solid"
            borderColor="cream.300"
          >
            <AlertDialogHeader
              fontFamily="heading"
              fontWeight="500"
              color="brand.500"
            >
              Delete achievement?
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color="charcoal.700" lineHeight="1.7">
                {deleteTarget?.title
                  ? `"${deleteTarget.title}" will be removed from your profile.`
                  : "This achievement will be removed from your profile."}
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter gap={3}>
              <Button
                ref={cancelRef}
                variant="ghostBrand"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
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
