import React, { useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import BrandMark from "../../components/brand/BrandMark";
import BrandWordmark from "../../components/brand/BrandWordmark";
import { employerRegistrationApi } from "../../api/employerRegistrationApi";
import { setAuth } from "../../store/authSlice";

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  password: "",

  companyName: "",
  industry: "",
  companySize: "",
  website: "",

  inviteCode: "",
};

const INDUSTRIES = [
  ["IT_SERVICES", "IT Services"],
  ["SOFTWARE", "Software"],
  ["FINANCIAL_SERVICES", "Financial Services"],
  ["BANKING", "Banking"],
  ["INSURANCE", "Insurance"],
  ["HEALTHCARE", "Healthcare"],
  ["PHARMACEUTICALS", "Pharmaceuticals"],
  ["MANUFACTURING", "Manufacturing"],
  ["RETAIL", "Retail"],
  ["E_COMMERCE", "E-Commerce"],
  ["TELECOMMUNICATIONS", "Telecommunications"],
  ["EDUCATION", "Education"],
  ["LOGISTICS", "Logistics"],
  ["HOSPITALITY", "Hospitality"],
  ["REAL_ESTATE", "Real Estate"],
  ["CONSULTING", "Consulting"],
  ["MEDIA", "Media"],
  ["OTHER", "Other"],
];

const COMPANY_SIZES = [
  ["STARTUP", "Startup"],
  ["SMALL", "Small"],
  ["MEDIUM", "Medium"],
  ["LARGE", "Large"],
  ["ENTERPRISE", "Enterprise"],
];

export default function EmployerRegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  /*
   * Completion represents the actual required registration fields.
   *
   * Invite code, company size and website are intentionally
   * excluded because they are optional.
   */
  const completion = useMemo(() => {
    const required = [
      form.fullName,
      form.email,
      form.phone,
      form.password,
      form.companyName,
      form.industry,
    ];

    return Math.round(
      (required.filter((value) => value.trim()).length / required.length) * 100,
    );
  }, [form]);

  const updateField = (field) => (event) => {
    const value = event.target.value;

    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const validate = () => {
    if (!form.fullName.trim()) {
      return "Please enter your full name.";
    }

    if (!form.email.trim()) {
      return "Please enter your work email.";
    }

    if (!isValidEmail(form.email)) {
      return "Please enter a valid email address.";
    }

    if (!form.phone.trim()) {
      return "Please enter your phone number.";
    }

    if (!form.password) {
      return "Please create a password.";
    }

    if (form.password.length < 8) {
      return "Your password must contain at least 8 characters.";
    }

    if (!/\d/.test(form.password)) {
      return "Your password must contain at least one number.";
    }

    if (!form.companyName.trim()) {
      return "Please enter your company name.";
    }

    if (!form.industry) {
      return "Please select your industry.";
    }

    if (form.website.trim() && !isValidWebsite(form.website)) {
      return "Please enter a valid website URL.";
    }

    if (form.inviteCode.trim().length > 100) {
      return "Invite code must not exceed 100 characters.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await employerRegistrationApi.register({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,

        companyName: form.companyName.trim(),
        industry: form.industry,
        companySize: form.companySize || null,
        website: form.website.trim() || null,

        inviteCode: form.inviteCode.trim() || null,
      });

      dispatch(
        setAuth({
          accessToken: response.token,
          user: {
            userId: response.userId,
            fullName: response.fullName,
            email: response.email,
            role: "COMPANY",
            companyId: response.companyId,
            membershipId: response.membershipId,
          },
        }),
      );

      navigate("/employer/setup/engagement", {
        replace: true,
      });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "We couldn't create your employer account. Please review your details and try again.";

      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box minH="100vh" bg="cream.100" color="charcoal.800">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <Box
        borderBottom="1px solid"
        borderColor="cream.300"
        bg="rgba(254,253,252,0.96)"
      >
        <Container maxW="1280px" px={{ base: 5, md: 8 }} py={4}>
          <HStack justify="space-between">
            <HStack
              spacing={3}
              cursor="pointer"
              onClick={() => navigate("/")}
              userSelect="none"
            >
              <BrandMark />
              <BrandWordmark />
            </HStack>

            <HStack spacing={2}>
              <Text
                display={{ base: "none", sm: "block" }}
                fontSize="sm"
                color="taupe.600"
              >
                Already have an account?
              </Text>

              <Button
                variant="ghostBrand"
                size="sm"
                borderRadius="4px"
                onClick={() => navigate("/employer/login")}
              >
                Employer Login
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* =========================================================
          MAIN
      ========================================================= */}
      <Container
        maxW="1240px"
        px={{ base: 5, md: 8, lg: 12 }}
        py={{ base: 10, md: 16, lg: 20 }}
      >
        <SimpleGrid
          columns={{ base: 1, lg: 12 }}
          gap={{ base: 10, lg: 16 }}
          alignItems="start"
        >
          {/* =====================================================
              LEFT EDITORIAL PANEL
          ===================================================== */}
          <Box gridColumn={{ lg: "span 4" }} pt={{ lg: 8 }}>
            <Text textStyle="overline" mb={5} color="accent.600">
              Employer Registration
            </Text>

            <Heading
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="500"
              fontStyle="italic"
              lineHeight="1.05"
              letterSpacing="-0.045em"
              color="brand.500"
            >
              Build your organization
              <Box as="span" display="block">
                with confidence.
              </Box>
            </Heading>

            <Box mt={7} w="64px" h="3px" bg="accent.500" />

            <Text
              mt={7}
              color="taupe.600"
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="1.9"
              maxW="440px"
            >
              Create one employer account, establish your company profile, and
              begin your relationship with Springboard Talent Partners.
            </Text>

            <VStack align="stretch" spacing={5} mt={10} maxW="440px">
              <RegistrationPoint
                icon={<BriefcaseBusiness size={17} />}
                title="One company account"
                description="One account can support multiple engagements and team members."
              />

              <RegistrationPoint
                icon={<LockKeyhole size={17} />}
                title="One primary relationship"
                description="The account holder starts as the primary contact for the organization."
              />

              <RegistrationPoint
                icon={<KeyRound size={17} />}
                title="Invitation supported"
                description="Have a Springboard invitation? Enter the code during registration."
              />
            </VStack>
          </Box>

          {/* =====================================================
              REGISTRATION FORM
          ===================================================== */}
          <Box
            gridColumn={{ lg: "span 8" }}
            bg="white"
            border="1px solid"
            borderColor="cream.300"
            borderRadius="6px"
            boxShadow="0 18px 50px rgba(46, 42, 40, 0.07)"
            overflow="hidden"
          >
            <Box h="3px" bg="accent.500" />

            <Box p={{ base: 6, md: 9, lg: 10 }}>
              {/* FORM HEADER */}
              <HStack justify="space-between" align="start" mb={8}>
                <Box>
                  <Text textStyle="overline" color="taupe.500" mb={2}>
                    Create Account
                  </Text>

                  <Heading
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="500"
                    color="brand.500"
                  >
                    Establish your organization
                  </Heading>

                  <Text mt={2} fontSize="sm" color="taupe.600">
                    Your account details will also establish you as the primary
                    contact.
                  </Text>
                </Box>

                <Box
                  display={{ base: "none", sm: "block" }}
                  textAlign="right"
                  minW="74px"
                >
                  <Text
                    fontSize="xs"
                    fontWeight="800"
                    color="accent.600"
                    letterSpacing="0.08em"
                  >
                    {completion}%
                  </Text>

                  <Text fontSize="10px" color="taupe.500" mt={1}>
                    COMPLETE
                  </Text>
                </Box>
              </HStack>

              {error && (
                <Alert
                  status="error"
                  mb={7}
                  bg="error.50"
                  border="1px solid"
                  borderColor="error.200"
                  borderRadius="5px"
                  color="error.700"
                  fontSize="sm"
                >
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Stack spacing={9}>
                  {/* =================================================
                      01 ACCOUNT + PRIMARY CONTACT
                  ================================================= */}
                  <FormSection
                    number="01"
                    title="Account & primary contact"
                    description="Your account becomes the primary relationship for your organization."
                  >
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                      <Field
                        label="Full Name"
                        required
                        value={form.fullName}
                        onChange={updateField("fullName")}
                        placeholder="Your full name"
                        autoComplete="name"
                      />

                      <Field
                        label="Work Email"
                        required
                        type="email"
                        value={form.email}
                        onChange={updateField("email")}
                        placeholder="you@company.com"
                        autoComplete="email"
                      />

                      <Field
                        label="Phone"
                        required
                        value={form.phone}
                        onChange={updateField("phone")}
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                      />

                      <FormControl isRequired>
                        <FormLabel>Password</FormLabel>

                        <InputGroup>
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={updateField("password")}
                            placeholder="At least 8 characters"
                            autoComplete="new-password"
                          />

                          <InputRightElement>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              minW="auto"
                              px={2}
                              color="taupe.500"
                              onClick={() => setShowPassword((value) => !value)}
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                            >
                              {showPassword ? (
                                <EyeOff size={17} />
                              ) : (
                                <Eye size={17} />
                              )}
                            </Button>
                          </InputRightElement>
                        </InputGroup>

                        <Text mt={1.5} fontSize="11px" color="taupe.500">
                          Minimum 8 characters and at least one number.
                        </Text>
                      </FormControl>
                    </SimpleGrid>
                  </FormSection>

                  {/* =================================================
                      02 COMPANY PROFILE
                  ================================================= */}
                  <FormSection
                    number="02"
                    title="Company profile"
                    description="Tell us the basic identity of your organization."
                  >
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                      <Field
                        label="Company Name"
                        required
                        value={form.companyName}
                        onChange={updateField("companyName")}
                        placeholder="Your company name"
                        autoComplete="organization"
                      />

                      <FormControl isRequired>
                        <FormLabel>Industry</FormLabel>

                        <Select
                          value={form.industry}
                          onChange={updateField("industry")}
                          placeholder="Select industry"
                        >
                          {INDUSTRIES.map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Company Size</FormLabel>

                        <Select
                          value={form.companySize}
                          onChange={updateField("companySize")}
                          placeholder="Select company size"
                        >
                          {COMPANY_SIZES.map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </Select>
                      </FormControl>

                      <Field
                        label="Website"
                        type="url"
                        value={form.website}
                        onChange={updateField("website")}
                        placeholder="https://www.company.com"
                        autoComplete="url"
                      />
                    </SimpleGrid>
                  </FormSection>

                  {/* =================================================
                      03 INVITATION
                  ================================================= */}
                  <FormSection
                    number="03"
                    title="Invitation"
                    description="If Springboard provided you with an invitation code, enter it here. This is optional."
                  >
                    <Box
                      border="1px solid"
                      borderColor="cream.300"
                      bg="cream.50"
                      p={{ base: 4, md: 5 }}
                      borderRadius="5px"
                    >
                      <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacing={5}
                        alignItems="end"
                      >
                        <Field
                          label="Invite Code"
                          value={form.inviteCode}
                          onChange={updateField("inviteCode")}
                          placeholder="Enter your invitation code"
                          autoComplete="off"
                        />

                        <Text
                          fontSize="xs"
                          lineHeight="1.7"
                          color="taupe.600"
                          pb={{ base: 0, md: 2 }}
                        >
                          No invitation? Leave this field blank and continue
                          with normal registration.
                        </Text>
                      </SimpleGrid>
                    </Box>
                  </FormSection>

                  {/* =================================================
                      SUBMIT
                  ================================================= */}
                  <Box pt={1}>
                    <HStack
                      justify="space-between"
                      align={{ base: "stretch", sm: "center" }}
                      flexDirection={{ base: "column", sm: "row" }}
                      spacing={4}
                    >
                      <Text
                        fontSize="xs"
                        color="taupe.500"
                        lineHeight="1.6"
                        maxW="430px"
                      >
                        By creating an account, you are starting your
                        organization journey with Springboard Talent Partners.
                      </Text>

                      <Button
                        type="submit"
                        h="48px"
                        px={7}
                        flexShrink={0}
                        borderRadius="4px"
                        rightIcon={<ArrowRight size={17} />}
                        isLoading={submitting}
                        loadingText="Creating account"
                      >
                        Create Employer Account
                      </Button>
                    </HStack>
                  </Box>
                </Stack>
              </form>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

/* =============================================================
   REGISTRATION POINT
============================================================= */

function RegistrationPoint({ icon, title, description }) {
  return (
    <HStack align="start" spacing={4}>
      <Box
        w="38px"
        h="38px"
        flexShrink={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        borderColor="accent.500"
        color="accent.600"
        borderRadius="4px"
      >
        {icon}
      </Box>

      <Box>
        <Text fontFamily="heading" fontSize="md" color="brand.500">
          {title}
        </Text>

        <Text mt={1} fontSize="sm" lineHeight="1.7" color="taupe.600">
          {description}
        </Text>
      </Box>
    </HStack>
  );
}

/* =============================================================
   FORM SECTION
============================================================= */

function FormSection({ number, title, description, children }) {
  return (
    <Box>
      <HStack align="start" spacing={4} mb={5}>
        <Text
          fontSize="xs"
          fontWeight="800"
          letterSpacing="0.14em"
          color="accent.600"
          pt={1}
        >
          {number}
        </Text>

        <Box>
          <Heading as="h2" fontSize="xl" fontWeight="500" color="brand.500">
            {title}
          </Heading>

          <Text mt={1} fontSize="sm" color="taupe.600">
            {description}
          </Text>
        </Box>
      </HStack>

      {children}
    </Box>
  );
}

/* =============================================================
   FIELD
============================================================= */

function Field({
  label,
  required = false,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete = "off",
}) {
  return (
    <FormControl isRequired={required}>
      <FormLabel>{label}</FormLabel>

      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </FormControl>
  );
}

/* =============================================================
   VALIDATION
============================================================= */

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidWebsite(value) {
  try {
    const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`;

    new URL(normalized);

    return true;
  } catch {
    return false;
  }
}
