import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  Icon,
  Text,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  UserRound,
  Target,
  Users,
} from "lucide-react";
import RegistrationLayout from "../../components/RegistrationLayout";
import { setStep } from "../../store/registrationSlice";

export default function ConfirmationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { account } = useSelector((s) => s.registration);

  const goToLogin = () => {
    dispatch(setStep("WELCOME"));
    navigate("/login", { replace: true });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";

    return "Good evening";
  };

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={{ base: 6, md: 7 }}>
        {/* ==================== SUCCESS HEADER ==================== */}
        <Box textAlign="center" pt={1}>
          <Box
            mx="auto"
            mb={4}
            w="68px"
            h="68px"
            borderRadius="full"
            bg="purple.50"
            border="1px solid"
            borderColor="purple.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 8px 24px rgba(128, 90, 213, 0.10)"
          >
            <Box
              w="50px"
              h="50px"
              borderRadius="full"
              bg="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={CheckCircle}
                w={7}
                h={7}
                color="purple.600"
                strokeWidth={2}
              />
            </Box>
          </Box>

          <HStack justify="center" spacing={2} mb={3}>
            <Badge
              bg="purple.50"
              color="purple.700"
              border="1px solid"
              borderColor="purple.100"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="10px"
              fontWeight="800"
              letterSpacing="0.04em"
              textTransform="uppercase"
            >
              Registration Complete
            </Badge>
          </HStack>

          <Heading
            size="lg"
            color="gray.900"
            fontWeight="800"
            letterSpacing="-0.03em"
          >
            {getGreeting()}, {account.fullName?.split(" ")[0]}!
          </Heading>

          <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mt={2}>
            Your Springboard Talent account is ready.
          </Text>

          <Text
            fontSize="sm"
            color="gray.500"
            mt={2}
            maxW="580px"
            mx="auto"
            lineHeight="1.7"
          >
            Everything is set up. You can now sign in and start building your
            career profile.
          </Text>
        </Box>

        {/* ==================== COMPLETION SUMMARY ==================== */}
        <Box
          bg="white"
          p={{ base: 5, md: 6 }}
          borderRadius="2xl"
          border="1px solid"
          borderColor="purple.100"
          boxShadow="0 10px 30px rgba(88, 28, 135, 0.06)"
        >
          <HStack spacing={3} mb={5}>
            <Box
              w="36px"
              h="36px"
              borderRadius="lg"
              bg="purple.50"
              border="1px solid"
              borderColor="purple.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Icon
                as={ShieldCheck}
                w={4}
                h={4}
                color="purple.600"
                strokeWidth={2}
              />
            </Box>

            <Box>
              <Text fontSize="md" fontWeight="800" color="gray.800">
                Your registration is complete
              </Text>

              <Text fontSize="xs" color="gray.500" mt={0.5}>
                Your account and required consent steps are complete.
              </Text>
            </Box>
          </HStack>

          <VStack align="stretch" spacing={0}>
            {[
              {
                title: "Account Created",
                detail: account.email,
              },
              {
                title: "Registration Details Completed",
                detail: "Your account information has been saved",
              },
              {
                title: "Agreements Accepted",
                detail: "NDA & Privacy Policy",
              },
            ].map((item, index) => (
              <HStack
                key={item.title}
                py={3.5}
                borderTop={index === 0 ? "1px solid" : undefined}
                borderBottom="1px solid"
                borderColor="gray.100"
                spacing={3}
              >
                <Box
                  w="30px"
                  h="30px"
                  borderRadius="full"
                  bg="purple.50"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon
                    as={CheckCircle}
                    w={4}
                    h={4}
                    color="purple.600"
                    strokeWidth={2}
                  />
                </Box>

                <Box flex={1} minW={0}>
                  <Text fontSize="sm" fontWeight="700" color="gray.700">
                    {item.title}
                  </Text>

                  <Text fontSize="xs" color="gray.500" mt={0.5} noOfLines={1}>
                    {item.detail}
                  </Text>
                </Box>

                <Badge
                  bg="purple.50"
                  color="purple.700"
                  border="1px solid"
                  borderColor="purple.100"
                  borderRadius="full"
                  px={2.5}
                  py={0.5}
                  fontSize="9px"
                  fontWeight="800"
                >
                  Done
                </Badge>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* ==================== WHAT'S NEXT ==================== */}
        <Box
          bg="purple.50"
          p={{ base: 5, md: 6 }}
          borderRadius="2xl"
          border="1px solid"
          borderColor="purple.100"
        >
          <HStack spacing={3} mb={5}>
            <Box
              w="36px"
              h="36px"
              borderRadius="lg"
              bg="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 4px 12px rgba(128, 90, 213, 0.07)"
            >
              <Icon
                as={Sparkles}
                w={4}
                h={4}
                color="purple.600"
                strokeWidth={2}
              />
            </Box>

            <Box>
              <Heading size="sm" color="gray.800" fontWeight="800">
                What's Next?
              </Heading>

              <Text fontSize="xs" color="gray.500" mt={0.5}>
                Build your career presence on Springboard Talent.
              </Text>
            </Box>
          </HStack>

          <VStack align="stretch" spacing={3}>
            <NextStep
              icon={UserRound}
              title="Complete Your Profile"
              description="Add your experience, education, skills and career goals."
            />

            <NextStep
              icon={Target}
              title="Take Skill Assessments"
              description="Showcase your abilities with industry-standard assessments."
            />

            <NextStep
              icon={Users}
              title="Get Matched with a Coach"
              description="Connect with the right coach to guide your career journey."
            />
          </VStack>
        </Box>

        {/* ==================== QUICK STATS ==================== */}
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
          <Box
            bg="white"
            p={5}
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.100"
            textAlign="center"
            boxShadow="0 6px 20px rgba(88, 28, 135, 0.04)"
          >
            <Box
              mx="auto"
              mb={3}
              w="32px"
              h="32px"
              borderRadius="lg"
              bg="purple.50"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={Calendar}
                w={4}
                h={4}
                color="purple.600"
                strokeWidth={2}
              />
            </Box>

            <Text fontSize="xs" color="gray.500">
              Account Created
            </Text>

            <Text fontSize="sm" fontWeight="800" color="gray.800" mt={1}>
              Today
            </Text>
          </Box>

          <Box
            bg="white"
            p={5}
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.100"
            textAlign="center"
            boxShadow="0 6px 20px rgba(88, 28, 135, 0.04)"
          >
            <Box
              mx="auto"
              mb={3}
              w="32px"
              h="32px"
              borderRadius="lg"
              bg="purple.50"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={Clock} w={4} h={4} color="purple.600" strokeWidth={2} />
            </Box>

            <Text fontSize="xs" color="gray.500">
              Registration Time
            </Text>

            <Text fontSize="sm" fontWeight="800" color="gray.800" mt={1}>
              ~5 minutes
            </Text>
          </Box>
        </SimpleGrid>

        {/* ==================== PRIMARY CTA ==================== */}
        <Box pt={1}>
          <Button
            width="100%"
            size="lg"
            height="54px"
            rightIcon={<ArrowRight size={16} />}
            onClick={goToLogin}
            borderRadius="xl"
            fontWeight="800"
            color="white"
            bgGradient="linear(to-r, purple.700, purple.600)"
            boxShadow="0 10px 28px rgba(128, 90, 213, 0.22)"
            _hover={{
              bgGradient: "linear(to-r, purple.800, purple.700)",
              boxShadow: "0 14px 32px rgba(128, 90, 213, 0.28)",
              transform: "translateY(-1px)",
            }}
            _active={{
              transform: "scale(0.985)",
            }}
            transition="all 0.2s ease"
          >
            Sign In to Your Account
          </Button>
        </Box>

        {/* ==================== WELCOME FOOTER ==================== */}
        <Box
          textAlign="center"
          bg="white"
          p={5}
          borderRadius="xl"
          border="1px solid"
          borderColor="purple.100"
        >
          <HStack justify="center" spacing={2}>
            <Icon as={Sparkles} w={3.5} h={3.5} color="purple.500" />

            <Text fontSize="sm" fontWeight="700" color="purple.700">
              Welcome to Springboard Talent!
            </Text>
          </HStack>

          <Text fontSize="xs" color="gray.500" mt={1}>
            Your journey to career transformation starts here.
          </Text>
        </Box>
      </VStack>
    </RegistrationLayout>
  );
}

function NextStep({ icon, title, description }) {
  return (
    <HStack
      align="center"
      spacing={3}
      p={3}
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="purple.100"
    >
      <Box
        w="34px"
        h="34px"
        borderRadius="lg"
        bg="purple.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <Icon as={icon} w={4} h={4} color="purple.600" strokeWidth={2} />
      </Box>

      <Box minW={0}>
        <Text fontSize="sm" fontWeight="700" color="gray.800">
          {title}
        </Text>

        <Text fontSize="xs" color="gray.500" mt={0.5} lineHeight="1.5">
          {description}
        </Text>
      </Box>
    </HStack>
  );
}
