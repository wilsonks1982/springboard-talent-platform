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

/* =============================================================
   CANDIDATE HEADER

   Springboard candidate workspace header.

   Responsibilities:
   - Candidate identity
   - Notifications affordance
   - Profile menu
   - Profile navigation
   - Settings placeholder
   - Logout

   Business/API behavior remains unchanged.
============================================================= */

export default function CandidateHeader({ candidate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const user = candidate?.user;

  const initials = getInitials(user?.fullName);

  /* =========================================================
     CLOSE MENU WHEN CLICKING OUTSIDE
  ========================================================== */

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

  /* =========================================================
     LOGOUT
  ========================================================== */

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

  /* =========================================================
     PROFILE
  ========================================================== */

  function openProfile() {
    setMenuOpen(false);

    navigate("/candidate/profile");
  }

  /* =========================================================
     SETTINGS
  ========================================================== */

  function openSettings() {
    setMenuOpen(false);

    // Settings page will be introduced later.
    // Keep the interaction safe until that route exists.
  }

  return (
    <Flex
      h={{ base: "64px", md: "72px" }}
      bg="white"
      borderBottom="1px solid"
      borderColor="cream.300"
      align="center"
      justify="space-between"
      px={{
        base: 4,
        md: 8,
      }}
      position="sticky"
      top="0"
      zIndex="20"
    >
      {/* =======================================================
          LEFT SIDE
      ======================================================== */}

      <Box>
        <Text
          fontFamily="heading"
          fontSize={{
            base: "lg",
            md: "xl",
          }}
          fontWeight="500"
          color="brand.500"
          lineHeight="1.2"
        >
          Candidate workspace
        </Text>

        <Text
          display={{
            base: "none",
            sm: "block",
          }}
          fontSize="10px"
          color="taupe.500"
          letterSpacing="0.04em"
          mt={1}
        >
          Your career journey
        </Text>
      </Box>

      {/* =======================================================
          RIGHT SIDE
      ======================================================== */}

      <HStack spacing={{ base: 2, md: 3 }}>
        {/* =====================================================
            NOTIFICATIONS
        ====================================================== */}

        <Box position="relative">
          <IconButton
            aria-label="Notifications"
            variant="ghost"
            icon={<Icon as={FiBell} boxSize="17px" />}
            borderRadius="4px"
            color="taupe.600"
            _hover={{
              bg: "cream.100",
              color: "brand.500",
            }}
            _active={{
              bg: "cream.200",
            }}
          />

          {/* Notification indicator */}

          <Box
            position="absolute"
            top="7px"
            right="7px"
            w="6px"
            h="6px"
            borderRadius="full"
            bg="accent.500"
            border="2px solid"
            borderColor="white"
          />
        </Box>

        {/* =====================================================
            CANDIDATE MENU
        ====================================================== */}

        <Box position="relative" ref={menuRef}>
          <Flex
            align="center"
            gap={3}
            px={2}
            py={1.5}
            border="1px solid"
            borderColor={menuOpen ? "cream.400" : "transparent"}
            borderRadius="4px"
            cursor="pointer"
            transition="all 0.15s ease"
            _hover={{
              bg: "cream.50",
              borderColor: "cream.300",
            }}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {/* Avatar */}

            <Avatar
              size="sm"
              name={user?.fullName}
              bg="brand.500"
              color="white"
              fontWeight="600"
              getInitials={() => initials}
            />

            {/* Identity */}

            <Box
              display={{
                base: "none",
                sm: "block",
              }}
              textAlign="left"
              minW="0"
            >
              <Text
                fontSize="sm"
                fontWeight="600"
                color="charcoal.800"
                lineHeight="1.3"
                maxW="180px"
                noOfLines={1}
              >
                {user?.fullName || "Candidate"}
              </Text>

              <Text
                fontSize="10px"
                color="taupe.500"
                letterSpacing="0.04em"
                mt={0.5}
              >
                Candidate
              </Text>
            </Box>

            {/* Chevron */}

            <Icon
              as={FiChevronDown}
              boxSize="15px"
              color="taupe.500"
              display={{
                base: "none",
                sm: "block",
              }}
              transition="transform 0.15s ease"
              transform={menuOpen ? "rotate(180deg)" : "rotate(0deg)"}
            />
          </Flex>

          {/* ===================================================
              PROFILE MENU
          ==================================================== */}

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

/* =============================================================
   PROFILE MENU
============================================================= */

function ProfileMenu({ user, onProfile, onSettings, onLogout }) {
  const initials = getInitials(user?.fullName);

  return (
    <Box
      position="absolute"
      right="0"
      top="calc(100% + 8px)"
      w={{
        base: "270px",
        sm: "290px",
      }}
      bg="white"
      border="1px solid"
      borderColor="cream.300"
      borderRadius="5px"
      boxShadow="0 14px 36px rgba(46, 42, 40, 0.12)"
      overflow="hidden"
      zIndex="50"
    >
      {/* =======================================================
          USER IDENTITY
      ======================================================== */}

      <Box px={5} py={5} bg="cream.50">
        <HStack spacing={3} align="center">
          <Avatar
            size="md"
            name={user?.fullName}
            bg="brand.500"
            color="white"
            fontWeight="600"
            getInitials={() => initials}
          />

          <Box minW="0">
            <Text
              fontSize="sm"
              fontWeight="700"
              color="charcoal.800"
              noOfLines={1}
            >
              {user?.fullName || "Candidate"}
            </Text>

            <Text fontSize="xs" color="taupe.500" mt={0.5} noOfLines={1}>
              {user?.email || ""}
            </Text>
          </Box>
        </HStack>
      </Box>

      <Divider borderColor="cream.300" />

      {/* =======================================================
          MENU
      ======================================================== */}

      <VStack align="stretch" spacing={0} p={2}>
        <MenuItem icon={FiUser} label="My Profile" onClick={onProfile} />

        <MenuItem
          icon={FiSettings}
          label="Account Settings"
          onClick={onSettings}
        />
      </VStack>

      <Divider borderColor="cream.300" />

      {/* =======================================================
          LOGOUT
      ======================================================== */}

      <Box p={2}>
        <MenuItem icon={FiLogOut} label="Sign out" danger onClick={onLogout} />
      </Box>
    </Box>
  );
}

/* =============================================================
   MENU ITEM
============================================================= */

function MenuItem({ icon, label, onClick, danger }) {
  return (
    <Flex
      align="center"
      gap={3}
      px={3}
      py={3}
      borderRadius="4px"
      cursor="pointer"
      color={danger ? "error.600" : "charcoal.700"}
      transition="all 0.15s ease"
      _hover={{
        bg: danger ? "error.50" : "cream.100",
        color: danger ? "error.700" : "brand.500",
      }}
      onClick={onClick}
    >
      <Icon as={icon} boxSize="16px" flexShrink={0} />

      <Text fontSize="sm" fontWeight="500">
        {label}
      </Text>
    </Flex>
  );
}

/* =============================================================
   INITIALS
============================================================= */

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
