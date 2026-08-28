import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiSettings,
  FiUser,
} from "react-icons/fi";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authApi } from "../../api/authApi";
import { clearAuth } from "../../store/authSlice";

export default function CandidateHeader({ candidate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const user = candidate?.user;

  const initials = getInitials(user?.fullName);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    setMenuOpen(false);

    try {
      await authApi.logout();
    } catch (error) {
      console.warn("Backend logout failed, clearing local session.", error);
    } finally {
      dispatch(clearAuth());

      navigate("/login", {
        replace: true,
      });
    }
  }

  function openProfile() {
    setMenuOpen(false);
    navigate("/candidate/profile");
  }

  function openSettings() {
    setMenuOpen(false);

    // Settings page will be introduced later.
    // For now we keep the interaction safe.
  }

  return (
    <Flex
      h="72px"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      align="center"
      justify="space-between"
      px={{ base: 5, md: 8 }}
      position="sticky"
      top="0"
      zIndex="20"
    >
      {/* Left */}
      <HStack spacing={3}>
        <Box
          display={{ base: "flex", lg: "none" }}
          w="40px"
          h="40px"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
          bg="gray.100"
        >
          <Text fontSize="lg">☰</Text>
        </Box>

        <Box display={{ base: "none", md: "block" }}>
          <Text fontSize="sm" fontWeight="600" color="gray.700">
            Candidate workspace
          </Text>

          <Text fontSize="xs" color="gray.400">
            Your career journey
          </Text>
        </Box>
      </HStack>

      {/* Right */}
      <HStack spacing={3}>
        {/* Notifications */}
        <Box position="relative">
          <IconButton
            aria-label="Notifications"
            variant="ghost"
            borderRadius="full"
            icon={<Icon as={FiBell} boxSize={5} />}
          />

          {/* Notification indicator */}
          <Box
            position="absolute"
            top="8px"
            right="8px"
            w="7px"
            h="7px"
            borderRadius="full"
            bg="purple.500"
            border="2px solid white"
          />
        </Box>

        {/* Candidate menu */}
        <Box position="relative" ref={menuRef}>
          <Flex
            align="center"
            gap={2}
            px={2}
            py={1.5}
            borderRadius="xl"
            cursor="pointer"
            _hover={{
              bg: "gray.50",
            }}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <Avatar
              size="sm"
              name={user?.fullName}
              bg="purple.100"
              color="purple.700"
              fontWeight="700"
              getInitials={() => initials}
            />

            <Box
              display={{
                base: "none",
                sm: "block",
              }}
              textAlign="left"
            >
              <Text fontSize="sm" fontWeight="600" color="gray.800">
                {user?.fullName || "Candidate"}
              </Text>

              <Text fontSize="xs" color="gray.400">
                Candidate
              </Text>
            </Box>

            <Icon
              as={FiChevronDown}
              boxSize={4}
              color="gray.400"
              display={{
                base: "none",
                sm: "block",
              }}
            />
          </Flex>

          {menuOpen && (
            <ProfileMenu
              user={user}
              onProfile={openProfile}
              onSettings={openSettings}
              onLogout={handleLogout}
            />
          )}
        </Box>
      </HStack>
    </Flex>
  );
}

function ProfileMenu({ user, onProfile, onSettings, onLogout }) {
  return (
    <Box
      position="absolute"
      right="0"
      top="calc(100% + 10px)"
      w={{ base: "260px", sm: "280px" }}
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      boxShadow="0 15px 40px rgba(15, 23, 42, 0.12)"
      overflow="hidden"
      zIndex="50"
    >
      {/* User identity */}
      <Box px={5} py={4}>
        <HStack spacing={3}>
          <Avatar
            size="md"
            name={user?.fullName}
            bg="purple.100"
            color="purple.700"
          />

          <Box minW="0">
            <Text fontSize="sm" fontWeight="700" noOfLines={1}>
              {user?.fullName}
            </Text>

            <Text fontSize="xs" color="gray.500" noOfLines={1}>
              {user?.email}
            </Text>
          </Box>
        </HStack>
      </Box>

      <Divider />

      {/* Menu */}
      <VStack align="stretch" spacing={0} p={2}>
        <MenuItem icon={FiUser} label="My Profile" onClick={onProfile} />

        <MenuItem
          icon={FiSettings}
          label="Account Settings"
          onClick={onSettings}
        />
      </VStack>

      <Divider />

      {/* Logout */}
      <Box p={2}>
        <MenuItem icon={FiLogOut} label="Sign out" danger onClick={onLogout} />
      </Box>
    </Box>
  );
}

function MenuItem({ icon, label, onClick, danger }) {
  return (
    <Flex
      align="center"
      gap={3}
      px={3}
      py={3}
      borderRadius="lg"
      cursor="pointer"
      color={danger ? "red.500" : "gray.700"}
      _hover={{
        bg: danger ? "red.50" : "gray.50",
      }}
      onClick={onClick}
    >
      <Icon as={icon} boxSize={4} />

      <Text fontSize="sm" fontWeight="500">
        {label}
      </Text>
    </Flex>
  );
}

function getInitials(name) {
  if (!name) {
    return "C";
  }

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
