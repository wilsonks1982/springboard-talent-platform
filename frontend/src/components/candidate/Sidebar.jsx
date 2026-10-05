import React from "react";
import { Box, Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";

import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCheckCircle,
  FiDollarSign,
  FiFileText,
  FiGrid,
  FiSettings,
  FiShield,
  FiStar,
  FiTarget,
  FiUser,
  FiUsers,
} from "react-icons/fi";

/* =============================================================
   CANDIDATE SIDEBAR

   Presentation/navigation component.

   The parent page owns all business logic.

   Props:
   - navigate
   - onOpenBasicProfile
   - onOpenExperience
   - onOpenEducation
   - onOpenCertification
   - onOpenAchievement
   - onOpenReference
   - onOpenCareerPreferences
   - onOpenResume
   - onOpenCompensation
   - onOpenEmploymentVerification
   - onLogout
============================================================= */

export default function Sidebar({
  navigate,
  onOpenBasicProfile,
  onOpenExperience,
  onOpenEducation,
  onOpenCertification,
  onOpenAchievement,
  onOpenReference,
  onOpenCareerPreferences,
  onOpenResume,
  onOpenCompensation,
  onOpenEmploymentVerification,
  onLogout,
}) {
  return (
    <Box
      display={{
        base: "none",
        lg: "block",
      }}
      w="248px"
      flexShrink={0}
      bg="brand.500"
      position="sticky"
      top="0"
      h="100vh"
      color="white"
    >
      {/* =========================================================
          BRAND
      ========================================================== */}

      <Box px={5} py={6} borderBottom="1px solid" borderColor="whiteAlpha.200">
        <HStack spacing={3}>
          <Box
            w="38px"
            h="38px"
            border="1px solid"
            borderColor="accent.300"
            borderRadius="4px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Text
              fontFamily="heading"
              fontSize="lg"
              color="accent.300"
              fontWeight="500"
            >
              S
            </Text>
          </Box>

          <Box>
            <Text
              fontFamily="heading"
              fontSize="xl"
              fontWeight="500"
              color="white"
              letterSpacing="0.04em"
            >
              Springboard
            </Text>

            <Text
              fontSize="8px"
              color="whiteAlpha.700"
              letterSpacing="0.18em"
              fontWeight="700"
              mt={1}
            >
              CANDIDATE WORKSPACE
            </Text>
          </Box>
        </HStack>
      </Box>

      {/* =========================================================
          NAVIGATION
      ========================================================== */}

      <Box
        h="calc(100vh - 94px)"
        overflowY="auto"
        px={4}
        py={6}
        pb="120px"
        sx={{
          "&::-webkit-scrollbar": {
            width: "5px",
          },

          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },

          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.18)",
            borderRadius: "4px",
          },

          scrollbarWidth: "thin",
        }}
      >
        <Stack spacing={6}>
          {/* =====================================================
              WORKSPACE
          ====================================================== */}

          <SidebarSection title="WORKSPACE">
            <SidebarItem icon={FiGrid} label="Overview" active />
          </SidebarSection>

          {/* =====================================================
              MY CAREER
          ====================================================== */}

          <SidebarSection title="MY CAREER">
            <SidebarItem
              icon={FiUser}
              label="Profile"
              onClick={onOpenBasicProfile}
            />

            <SidebarItem
              icon={FiBriefcase}
              label="Experience"
              onClick={onOpenExperience}
            />

            <SidebarItem
              icon={FiBookOpen}
              label="Education"
              onClick={onOpenEducation}
            />

            <SidebarItem
              icon={FiAward}
              label="Certifications"
              onClick={onOpenCertification}
            />

            <SidebarItem
              icon={FiStar}
              label="Achievements"
              onClick={onOpenAchievement}
            />

            <SidebarItem
              icon={FiUsers}
              label="References"
              onClick={onOpenReference}
            />

            <SidebarItem
              icon={FiFileText}
              label="Resume"
              onClick={onOpenResume}
            />
          </SidebarSection>

          {/* =====================================================
              CAREER MANAGEMENT
          ====================================================== */}

          <SidebarSection title="CAREER MANAGEMENT">
            <SidebarItem
              icon={FiTarget}
              label="Career Preferences"
              onClick={onOpenCareerPreferences}
            />

            <SidebarItem
              icon={FiDollarSign}
              label="Compensation"
              onClick={onOpenCompensation}
            />

            <SidebarItem
              icon={FiShield}
              label="Employment Verification"
              onClick={onOpenEmploymentVerification}
            />
          </SidebarSection>

          {/* =====================================================
              OPPORTUNITIES
          ====================================================== */}

          <SidebarSection title="OPPORTUNITIES">
            <SidebarItem icon={FiBriefcase} label="Opportunities" muted />

            <SidebarItem
              icon={FiCheckCircle}
              label="Assessments"
              onClick={() => navigate("/candidate/assessments")}
            />
          </SidebarSection>

          {/* =====================================================
              ACCOUNT
          ====================================================== */}

          <SidebarSection title="ACCOUNT">
            <SidebarItem icon={FiSettings} label="Settings" muted />

            <SidebarItem icon={FiUser} label="Sign out" onClick={onLogout} />
          </SidebarSection>
        </Stack>
      </Box>

      {/* =========================================================
          PROFILE TIP
      ========================================================== */}
      {/* 
      <Box
        position="absolute"
        left={4}
        right={4}
        bottom={5}
        bg="whiteAlpha.100"
        border="1px solid"
        borderColor="whiteAlpha.200"
        borderRadius="4px"
        p={4}
      >
        <Text
          fontSize="10px"
          fontWeight="800"
          letterSpacing="0.1em"
          color="accent.300"
          mb={2}
        >
          YOUR ADVANTAGE
        </Text>

        <Text fontSize="xs" lineHeight="1.6" color="whiteAlpha.800">
          A thoughtful, complete profile helps recruiters understand your
          potential faster.
        </Text>
      </Box> */}
    </Box>
  );
}

/* =============================================================
   SIDEBAR SECTION
============================================================= */

function SidebarSection({ title, children }) {
  return (
    <Box>
      <Text
        px={3}
        mb={2}
        fontSize="9px"
        fontWeight="800"
        letterSpacing="0.16em"
        color="accent.300"
        opacity={0.85}
      >
        {title}
      </Text>

      <Stack spacing={1}>{children}</Stack>
    </Box>
  );
}

/* =============================================================
   SIDEBAR ITEM
============================================================= */

function SidebarItem({ icon, label, active, onClick, muted }) {
  const textColor = active
    ? "white"
    : muted
      ? "whiteAlpha.500"
      : "whiteAlpha.800";

  const iconColor = active
    ? "accent.300"
    : muted
      ? "whiteAlpha.400"
      : "whiteAlpha.700";

  return (
    <Flex
      px={3}
      py={2.5}
      borderRadius="4px"
      align="center"
      gap={3}
      cursor={muted ? "default" : "pointer"}
      bg={active ? "whiteAlpha.150" : "transparent"}
      color={textColor}
      borderLeft="2px solid"
      borderColor={active ? "accent.500" : "transparent"}
      transition="all 0.15s ease"
      _hover={
        muted
          ? {}
          : {
              bg: "whiteAlpha.100",
              color: "white",
            }
      }
      onClick={onClick}
    >
      <Icon as={icon} boxSize="16px" color={iconColor} flexShrink={0} />

      <Text
        fontSize="sm"
        fontWeight={active ? "600" : "500"}
        color="inherit"
        whiteSpace="nowrap"
      >
        {label}
      </Text>
    </Flex>
  );
}
