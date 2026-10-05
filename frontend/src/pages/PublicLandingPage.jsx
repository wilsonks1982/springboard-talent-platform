import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Sparkles,
  UserRound,
} from "lucide-react";

import BrandMark from "../components/brand/BrandMark";
import BrandWordmark from "../components/brand/BrandWordmark";

export default function PublicLandingPage() {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" bg="cream.100" color="charcoal.800" overflow="hidden">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <Box
        position="sticky"
        top={0}
        zIndex={30}
        bg="rgba(255,255,255,0.96)"
        backdropFilter="blur(14px)"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Container maxW="1280px" py={4} px={{ base: 5, md: 8 }}>
          <HStack justify="space-between">
            {/* Brand */}
            <HStack
              spacing={3}
              cursor="pointer"
              userSelect="none"
              onClick={() => navigate("/")}
            >
              <BrandMark />
              <BrandWordmark />
            </HStack>

            {/* Navigation */}
            <HStack spacing={{ base: 1, md: 3 }}>
              <Button
                variant="ghost"
                size="sm"
                color="charcoal.600"
                fontWeight="600"
                borderRadius="0"
                onClick={() => navigate("/login")}
                _hover={{
                  bg: "brand.50",
                  color: "brand.500",
                }}
              >
                Candidate Login
              </Button>

              <Button
                variant="ghostBrand"
                size="sm"
                fontWeight="700"
                borderRadius="0"
                onClick={() => navigate("/employer/login")}
              >
                Employer Login
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* =========================================================
          HERO
      ========================================================= */}
      <Box
        position="relative"
        overflow="hidden"
        bg="cream.100"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        {/* Decorative vertical line */}
        <Box
          position="absolute"
          left={{ base: "20px", lg: "7%" }}
          top={0}
          bottom={0}
          w="1px"
          bg="gray.200"
          opacity={0.7}
        />

        <Container
          maxW="1280px"
          px={{ base: 8, md: 14, lg: 20 }}
          py={{ base: 20, md: 28, lg: 32 }}
          position="relative"
        >
          <SimpleGrid
            columns={{ base: 1, lg: 12 }}
            gap={{ base: 12, lg: 16 }}
            alignItems="center"
          >
            {/* Hero copy */}
            <Box gridColumn={{ lg: "span 7" }}>
              <Text textStyle="overline" mb={6}>
                Positioning
              </Text>

              <Heading
                as="h1"
                fontSize={{
                  base: "4xl",
                  sm: "5xl",
                  md: "6xl",
                  lg: "7xl",
                }}
                lineHeight={{ base: 1.05, md: 1 }}
                fontWeight="500"
                fontStyle="italic"
                letterSpacing="-0.045em"
                color="brand.500"
                maxW="850px"
                fontFamily="heading"
              >
                Your Potential.
                <Box as="span" display="block">
                  Your Platform.
                </Box>
              </Heading>

              <Box mt={7} w="70px" h="3px" bg="accent.500" />

              <Text
                mt={7}
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.9"
                color="taupe.600"
                maxW="650px"
              >
                A talent platform designed for professionals who want to grow,
                and organizations that want to find and develop their gold
                standard.
              </Text>

              <HStack mt={9} spacing={4} flexWrap="wrap">
                <Button
                  h="50px"
                  px={7}
                  borderRadius="0"
                  rightIcon={<ArrowRight size={17} />}
                  onClick={() => navigate("/register/welcome")}
                >
                  Start as a Candidate
                </Button>

                <Button
                  h="50px"
                  px={7}
                  variant="outlineGold"
                  borderRadius="0"
                  rightIcon={<ArrowUpRight size={17} />}
                  onClick={() => navigate("/employer/register")}
                >
                  Find Talent
                </Button>
              </HStack>
            </Box>

            {/* Brand statements */}
            <Box
              gridColumn={{ lg: "span 5" }}
              borderLeft={{ base: "none", lg: "1px solid" }}
              borderColor="gray.300"
              pl={{ base: 0, lg: 12 }}
            >
              <VStack align="stretch" spacing={10}>
                <BrandStatement
                  label="Brand Promise"
                  title="Find Your Gold Standard."
                  description="Discover the people, opportunities, and capabilities that move careers and organizations forward."
                />

                <BrandStatement
                  label="Philosophy"
                  title="Grow. Outgrow."
                  description="Growth is not a destination. It is the ability to continuously become more capable, more confident, and more valuable."
                />
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* =========================================================
          ROLE SELECTION
      ========================================================= */}
      <Box bg="white" py={{ base: 16, md: 24 }} px={{ base: 5, md: 8 }}>
        <Container maxW="1120px">
          <VStack spacing={4} textAlign="center" mb={12}>
            <Text textStyle="overline" color="accent.600">
              Choose Your Journey
            </Text>

            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="500"
              color="brand.500"
              letterSpacing="-0.035em"
            >
              One platform. Two perspectives.
            </Heading>

            <Text color="taupe.600" maxW="650px" lineHeight="1.8">
              Whether you're advancing your career or building your team,
              Springboard gives you the tools and relationships to move forward.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Candidate */}
            <RoleCard
              eyebrow="For Candidates"
              icon={<UserRound size={22} />}
              title="Build your potential."
              description="Create a powerful professional profile, understand your strengths, develop your capabilities, and connect with opportunities aligned to your goals."
              items={[
                "Professional profile",
                "Skills & assessments",
                "Career development",
                "Talent opportunities",
              ]}
              primaryLabel="Create Candidate Account"
              secondaryLabel="Candidate Login"
              onPrimary={() => navigate("/register/welcome")}
              onSecondary={() => navigate("/login")}
            />

            {/* Employer */}
            <RoleCard
              employer
              eyebrow="For Employers"
              icon={<BriefcaseBusiness size={22} />}
              title="Find your gold standard."
              description="Discover qualified talent, define your hiring needs, manage your recruitment workflow, and build teams around the people who fit."
              items={[
                "Talent search",
                "Role creation",
                "Candidate screening",
                "Hiring workflow",
              ]}
              primaryLabel="Create Employer Account"
              secondaryLabel="Employer Login"
              onPrimary={() => navigate("/employer/register")}
              onSecondary={() => navigate("/employer/login")}
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* =========================================================
          BRAND PROMISE
      ========================================================= */}
      <Box
        bg="brand.500"
        color="white"
        py={{ base: 18, md: 26 }}
        px={{ base: 5, md: 8 }}
      >
        <Container maxW="1050px">
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            gap={{ base: 10, md: 16 }}
            alignItems="center"
          >
            <Box>
              <Text textStyle="overline" color="accent.300" mb={5}>
                Brand Promise
              </Text>

              <Heading
                fontSize={{ base: "4xl", md: "5xl" }}
                fontWeight="500"
                fontStyle="italic"
                lineHeight="1.1"
                color="white"
              >
                Find Your
                <Box as="span" display="block">
                  Gold Standard.
                </Box>
              </Heading>
            </Box>

            <Box>
              <Text
                color="whiteAlpha.800"
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.9"
              >
                The right opportunity can change a career. The right person can
                change an organization. Springboard Talent brings both sides
                together through a platform designed around capability,
                potential, and meaningful progress.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* =========================================================
          WHAT WE DELIVER
      ========================================================= */}
      <Box bg="cream.100" py={{ base: 16, md: 22 }} px={{ base: 5, md: 8 }}>
        <Container maxW="1120px">
          <VStack spacing={4} textAlign="center" mb={12}>
            <Text textStyle="overline">What We Deliver</Text>

            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="500"
              color="brand.500"
            >
              Progress with purpose.
            </Heading>
          </VStack>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={0}
            borderTop="1px solid"
            borderColor="gray.300"
          >
            <DeliveryItem
              number="01"
              title="Discover"
              description="Understand potential, capability, and opportunity."
            />

            <DeliveryItem
              number="02"
              title="Develop"
              description="Build stronger skills, profiles, and career direction."
            />

            <DeliveryItem
              number="03"
              title="Connect"
              description="Create meaningful connections between talent and organizations."
            />

            <DeliveryItem
              number="04"
              title="Elevate"
              description="Turn progress into meaningful professional outcomes."
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* =========================================================
          PHILOSOPHY CTA
      ========================================================= */}
      <Box bg="white" py={{ base: 18, md: 26 }} px={{ base: 5, md: 8 }}>
        <Container maxW="850px">
          <VStack textAlign="center" spacing={7}>
            <Box
              w="54px"
              h="54px"
              border="1px solid"
              borderColor="accent.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="accent.500"
            >
              <Sparkles size={21} />
            </Box>

            <Text textStyle="overline">Philosophy</Text>

            <Heading
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="500"
              fontStyle="italic"
              color="brand.500"
              letterSpacing="-0.04em"
            >
              Grow. Outgrow.
            </Heading>

            <Text
              color="taupe.600"
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="1.9"
              maxW="650px"
            >
              Don't simply prepare for what's next. Build the capability to
              create what's next.
            </Text>

            <HStack spacing={4} pt={3} flexWrap="wrap" justify="center">
              <Button
                h="50px"
                px={7}
                rightIcon={<ArrowRight size={17} />}
                onClick={() => navigate("/register/welcome")}
              >
                Begin Your Journey
              </Button>

              <Button
                h="50px"
                px={7}
                variant="outlineGold"
                onClick={() => navigate("/employer/register")}
              >
                Partner With Us
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <Box bg="charcoal.800" color="white" py={10} px={{ base: 5, md: 8 }}>
        <Container maxW="1200px">
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10} mb={10}>
            {/* Brand */}
            <HStack spacing={3} mb={4}>
              <BrandMark dark />

              <BrandWordmark dark />
            </HStack>

            {/* Candidates */}
            <FooterColumn
              title="Candidates"
              links={[
                ["Login", () => navigate("/login")],
                ["Create Account", () => navigate("/register/welcome")],
              ]}
            />

            {/* Employers */}
            <FooterColumn
              title="Employers"
              links={[
                ["Login", () => navigate("/employer/login")],
                ["Create Account", () => navigate("/employer/register")],
              ]}
            />

            {/* Company */}
            <FooterColumn
              title="Company"
              links={[
                ["About Us", null],
                ["Contact", null],
                ["Privacy", null],
                ["Terms", null],
              ]}
            />
          </SimpleGrid>

          <Divider borderColor="whiteAlpha.200" />

          <HStack justify="space-between" flexWrap="wrap" gap={4} pt={6}>
            <Text fontSize="xs" color="whiteAlpha.500">
              © 2026 Springboard Talent Partners. All rights reserved.
            </Text>

            <Text
              fontFamily="heading"
              fontStyle="italic"
              fontSize="sm"
              color="accent.300"
            >
              Grow. Outgrow.
            </Text>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}

/* =============================================================
   BRAND STATEMENT
============================================================= */

function BrandStatement({ label, title, description }) {
  return (
    <Box>
      <Text textStyle="overline" mb={4}>
        {label}
      </Text>

      <Heading
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="500"
        fontStyle="italic"
        color="brand.500"
        lineHeight="1.15"
      >
        {title}
      </Heading>

      <Text
        mt={4}
        color="taupe.600"
        fontSize="sm"
        lineHeight="1.8"
        maxW="440px"
      >
        {description}
      </Text>
    </Box>
  );
}

/* =============================================================
   ROLE CARD
============================================================= */

function RoleCard({
  employer = false,
  eyebrow,
  icon,
  title,
  description,
  items,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}) {
  return (
    <Box
      border="1px solid"
      borderColor={employer ? "accent.300" : "gray.300"}
      bg={employer ? "cream.100" : "white"}
      p={{ base: 7, md: 9 }}
      position="relative"
      transition="all 0.25s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 18px 45px rgba(46, 42, 40, 0.10)",
      }}
    >
      <HStack justify="space-between" align="start" mb={7}>
        <Box
          w="52px"
          h="52px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderColor={employer ? "accent.500" : "brand.500"}
          color={employer ? "accent.600" : "brand.500"}
        >
          {icon}
        </Box>

        <Text
          fontSize="9px"
          fontWeight="800"
          letterSpacing="0.17em"
          color={employer ? "accent.600" : "taupe.500"}
          textTransform="uppercase"
        >
          {eyebrow}
        </Text>
      </HStack>

      <Heading
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="500"
        color="brand.500"
        lineHeight="1.1"
      >
        {title}
      </Heading>

      <Text
        mt={5}
        color="taupe.600"
        lineHeight="1.8"
        fontSize="sm"
        minH={{ md: "88px" }}
      >
        {description}
      </Text>

      <VStack align="stretch" spacing={3} mt={7} mb={8}>
        {items.map((item) => (
          <HStack key={item} spacing={3}>
            <Check
              size={15}
              color={
                employer
                  ? "var(--chakra-colors-accent-500)"
                  : "var(--chakra-colors-brand-500)"
              }
            />

            <Text fontSize="sm" color="charcoal.800">
              {item}
            </Text>
          </HStack>
        ))}
      </VStack>

      <Divider borderColor="gray.300" mb={6} />

      <HStack spacing={3}>
        <Button
          flex={1}
          h="46px"
          borderRadius="0"
          rightIcon={<ArrowRight size={16} />}
          onClick={onPrimary}
        >
          {primaryLabel}
        </Button>

        <Button
          h="46px"
          variant="outline"
          borderRadius="0"
          onClick={onSecondary}
        >
          {secondaryLabel}
        </Button>
      </HStack>
    </Box>
  );
}

/* =============================================================
   DELIVERY ITEM
============================================================= */

function DeliveryItem({ number, title, description }) {
  return (
    <Box
      p={{ base: 6, md: 8 }}
      borderBottom="1px solid"
      borderRight={{
        base: "none",
        md: "1px solid",
      }}
      borderColor="gray.300"
      _last={{
        borderRight: "none",
      }}
    >
      <Text
        fontSize="xs"
        fontWeight="800"
        letterSpacing="0.15em"
        color="accent.600"
        mb={6}
      >
        {number}
      </Text>

      <Heading fontSize="2xl" fontWeight="500" color="brand.500">
        {title}
      </Heading>

      <Text mt={4} fontSize="sm" lineHeight="1.8" color="taupe.600">
        {description}
      </Text>
    </Box>
  );
}

/* =============================================================
   FOOTER COLUMN
============================================================= */

function FooterColumn({ title, links }) {
  return (
    <VStack align="start" spacing={3}>
      <Text
        fontSize="xs"
        fontWeight="800"
        letterSpacing="0.15em"
        color="accent.300"
        mb={2}
        textTransform="uppercase"
      >
        {title}
      </Text>

      {links.map(([label, action]) => (
        <Text
          key={label}
          fontSize="sm"
          color="whiteAlpha.600"
          cursor={action ? "pointer" : "default"}
          onClick={action || undefined}
          _hover={
            action
              ? {
                  color: "white",
                }
              : {}
          }
        >
          {label}
        </Text>
      ))}
    </VStack>
  );
}
