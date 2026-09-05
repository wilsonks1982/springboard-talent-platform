import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Tag,
  VStack,
} from "@chakra-ui/react";
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCheckCircle,
  FiChevronRight,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiMapPin,
  FiMenu,
  FiSettings,
  FiUser,
} from "react-icons/fi";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authApi } from "../../api/authApi";
import { candidateApi } from "../../api/candidateApi";
import { clearAuth } from "../../store/authSlice";
import { profileStrengthApi } from "../../api/candidateProfileStrengthApi";

import CandidateHeader from "../../components/candidate/candidateHeader";

import ExperienceInsights from "../../components/candidate/ExperienceInsights";
import ExperienceSection from "../../components/candidate/sections/ExperienceSection";
import ExperienceDrawer from "../../components/candidate/drawers/ExperienceDrawer";
import { candidateExperienceApi } from "../../api/candidateExperienceApi";

import EducationSection from "../../components/candidate/sections/EducationSection";
import EducationDrawer from "../../components/candidate/drawers/EducationDrawer";
import { candidateEducationApi } from "../../api/candidateEducationApi";

import ProfileStrengthCard from "../../components/candidate/sections/ProfileStrengthCard";

import ResumeSection from "../../components/candidate/sections/ResumeSection";
import ResumeUploadDrawer from "../../components/candidate/drawers/ResumeUploadDrawer";
import { candidateResumeApi } from "../../api/candidateResumeApi";

import CertificationsSection from "../../components/candidate/sections/CertificationsSection";
import CertificationDrawer from "../../components/candidate/drawers/CertificationDrawer";
import { candidateCertificationApi } from "../../api/candidateCertificationApi";

import AchievementsSection from "../../components/candidate/sections/AchievementsSection";
import AchievementDrawer from "../../components/candidate/drawers/AchievementDrawer";
import { candidateAchievementApi } from "../../api/candidateAchievementApi";

import ReferencesSection from "../../components/candidate/sections/ReferencesSection";
import ReferenceDrawer from "../../components/candidate/drawers/ReferenceDrawer";
import { candidateReferenceApi } from "../../api/candidateReferenceApi";

import CareerPreferencesDrawer from "../../components/candidate/drawers/CareerPreferencesDrawer";
import { candidateCareerPreferencesApi } from "../../api/candidateCareerPreferencesApi";

import BasicProfileCard from "../../components/candidate/sections/BasicProfileCard";
import BasicProfileDrawer from "../../components/candidate/drawers/BasicProfileDrawer";
import { candidateBasicProfileApi } from "../../api/candidateBasicProfileApi";

import CandidateCompensationCard from "../../components/candidate/sections/CandidateCompensationCard";
import CandidateCompensationDrawer from "../../components/candidate/drawers/CandidateCompensationDrawer";
import { candidateCompensationApi } from "../../api/candidateCompensationApi";

import EmploymentVerificationCard from "../../components/candidate/sections/EmploymentVerificationCard";

import EmploymentVerificationDrawer from "../../components/candidate/drawers/EmploymentVerificationDrawer";

import { candidateEmploymentVerificationApi } from "../../api/candidateEmploymentVerificationApi";

import { candidateEmploymentVerificationDocumentApi } from "../../api/candidateEmploymentVerificationDocumentApi";

export default function CandidateLandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [experiences, setExperiences] = useState([]);
  const [experienceDrawerOpen, setExperienceDrawerOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [employmentAnalysis, setEmploymentAnalysis] = useState({
    yearsExperience: 0,
    currentTitle: null,
    currentCompany: null,
    employmentGaps: [],
  });

  const [education, setEducation] = useState([]);
  const [educationDrawerOpen, setEducationDrawerOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);

  const [profileStrength, setProfileStrength] = useState(null);

  const [resume, setResume] = useState(null);
  const [resumeDrawerOpen, setResumeDrawerOpen] = useState(false);

  const [certifications, setCertifications] = useState([]);
  const [certificationDrawerOpen, setCertificationDrawerOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null);

  const [achievements, setAchievements] = useState([]);
  const [achievementDrawerOpen, setAchievementDrawerOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);

  const [references, setReferences] = useState([]);
  const [referenceDrawerOpen, setReferenceDrawerOpen] = useState(false);
  const [editingReference, setEditingReference] = useState(null);

  const [careerPreferencesDrawerOpen, setCareerPreferencesDrawerOpen] =
    useState(false);

  const [basicProfile, setBasicProfile] = useState(null);
  const [isBasicProfileOpen, setIsBasicProfileOpen] = useState(false);

  const [compensation, setCompensation] = useState(null);
  const [isCompensationOpen, setIsCompensationOpen] = useState(false);

  const [employmentVerification, setEmploymentVerification] = useState(null);

  const [
    employmentVerificationDrawerOpen,
    setEmploymentVerificationDrawerOpen,
  ] = useState(false);

  useEffect(() => {
    loadCandidate();
  }, []);

  async function loadCandidate() {
    try {
      setLoading(true);
      setError("");

      const [
        candidateData,
        profileStrengthData,
        basicProfileData,
        compensationData,
        employmentVerificationData,
        employmentAnalysisData,
      ] = await Promise.all([
        candidateApi.getMe(),
        profileStrengthApi.get(),
        candidateBasicProfileApi.get(),
        candidateCompensationApi.get(),
        candidateEmploymentVerificationApi.get(),
        candidateExperienceApi.getAnalysis(),
      ]);

      setCandidate(candidateData);
      setExperiences(candidateData.experiences || []);
      setEducation(candidateData.education || []);
      setCertifications(candidateData.certifications || []);
      setAchievements(candidateData.achievements || []);
      setReferences(candidateData.references || []);
      setResume(candidateData.resume || null);

      setProfileStrength(profileStrengthData);
      setBasicProfile(basicProfileData);
      setCompensation(compensationData);
      setEmploymentVerification(employmentVerificationData);
      setEmploymentAnalysis(employmentAnalysisData);
    } catch (err) {
      console.error("Failed to load candidate profile", err);

      setError(
        err.response?.data?.message || "Unable to load your candidate profile.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await authApi.logout();
    } catch {
      // Logout locally even if backend logout fails.
    }

    dispatch(clearAuth());
    navigate("/login", { replace: true });
  }

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box p={8}>
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  if (!candidate) {
    return null;
  }

  const completion = calculateProfileCompletion(candidate);

  const firstName = candidate.user?.fullName?.split(" ")[0] || "there";

  function handleAddExperience() {
    setEditingExperience(null);
    setExperienceDrawerOpen(true);
  }

  function handleEditExperience(experience) {
    setEditingExperience(experience);
    setExperienceDrawerOpen(true);
  }

  async function handleSaveExperience(payload, experienceId) {
    if (experienceId) {
      const updated = await candidateExperienceApi.update(
        experienceId,
        payload,
      );

      setExperiences((current) =>
        current.map((experience) =>
          experience.id === experienceId ? updated : experience,
        ),
      );
    } else {
      const created = await candidateExperienceApi.create(payload);

      setExperiences((current) => [...current, created]);

      const analysis = await candidateExperienceApi.getAnalysis();

      setEmploymentAnalysis(analysis);

      await refreshProfileStrength();
    }
  }

  async function handleDeleteExperience(experience) {
    await candidateExperienceApi.remove(experience.id);

    setExperiences((current) =>
      current.filter((item) => item.id !== experience.id),
    );

    const analysis = await candidateExperienceApi.getAnalysis();

    setEmploymentAnalysis(analysis);

    await refreshProfileStrength();
  }

  function handleAddEducation() {
    setEditingEducation(null);
    setEducationDrawerOpen(true);
  }

  function handleEditEducation(item) {
    setEditingEducation(item);
    setEducationDrawerOpen(true);
  }

  async function handleSaveEducation(payload, educationId) {
    if (educationId) {
      const updated = await candidateEducationApi.update(educationId, payload);

      setEducation((current) =>
        current.map((item) => (item.id === educationId ? updated : item)),
      );
    } else {
      const created = await candidateEducationApi.create(payload);

      setEducation((current) => [...current, created]);

      await refreshProfileStrength();
    }
  }

  async function handleDeleteEducation(item) {
    await candidateEducationApi.remove(item.id);

    setEducation((current) =>
      current.filter((education) => education.id !== item.id),
    );

    await refreshProfileStrength();
  }

  function handleProfileSectionAction(sectionKey) {
    switch (sectionKey) {
      case "EXPERIENCE":
        handleAddExperience();
        break;

      case "EDUCATION":
        handleAddEducation();
        break;

      default:
        break;
    }
  }

  async function refreshProfileStrength() {
    try {
      const data = await profileStrengthApi.get();

      setProfileStrength(data);
    } catch (err) {
      console.error("Failed to refresh profile strength", err);
    }
  }

  function handleUploadResume() {
    setResumeDrawerOpen(true);
  }

  async function handleSaveResume(file) {
    const uploaded = await candidateResumeApi.upload(file);

    setResume(uploaded);

    await refreshProfileStrength();
  }

  async function handleDownloadResume() {
    const blob = await candidateResumeApi.download();

    const url = window.URL.createObjectURL(blob);

    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "Resume.pdf";

    document.body.appendChild(anchor);

    anchor.click();

    anchor.remove();

    window.URL.revokeObjectURL(url);
  }

  async function handleDeleteResume() {
    await candidateResumeApi.delete();

    setResume(null);

    await refreshProfileStrength();
  }

  function handleAddCertification() {
    setEditingCertification(null);
    setCertificationDrawerOpen(true);
  }

  function handleEditCertification(certification) {
    setEditingCertification(certification);
    setCertificationDrawerOpen(true);
  }

  async function handleSaveCertification(data) {
    let saved;

    if (editingCertification) {
      saved = await candidateCertificationApi.update(
        editingCertification.id,
        data,
      );
    } else {
      saved = await candidateCertificationApi.create(data);
    }

    setCandidate((current) => ({
      ...current,
      certifications: editingCertification
        ? current.certifications.map((item) =>
            item.id === saved.id ? saved : item,
          )
        : [...current.certifications, saved],
    }));

    await refreshProfileStrength();
  }

  async function handleDeleteCertification(id) {
    await candidateCertificationApi.delete(id);

    setCandidate((current) => ({
      ...current,
      certifications: current.certifications.filter((item) => item.id !== id),
    }));

    await refreshProfileStrength();
  }

  function handleAddAchievement() {
    setEditingAchievement(null);
    setAchievementDrawerOpen(true);
  }

  function handleEditAchievement(achievement) {
    setEditingAchievement(achievement);
    setAchievementDrawerOpen(true);
  }

  async function handleSaveAchievement(data) {
    let saved;

    if (editingAchievement) {
      saved = await candidateAchievementApi.update(editingAchievement.id, data);
    } else {
      saved = await candidateAchievementApi.create(data);
    }

    setCandidate((current) => ({
      ...current,
      achievements: editingAchievement
        ? current.achievements.map((item) =>
            item.id === saved.id ? saved : item,
          )
        : [...current.achievements, saved],
    }));

    await refreshProfileStrength();
  }

  async function handleDeleteAchievement(id) {
    await candidateAchievementApi.delete(id);

    setCandidate((current) => ({
      ...current,
      achievements: current.achievements.filter((item) => item.id !== id),
    }));

    await refreshProfileStrength();
  }

  function handleAddReference() {
    setEditingReference(null);
    setReferenceDrawerOpen(true);
  }

  function handleEditReference(reference) {
    setEditingReference(reference);
    setReferenceDrawerOpen(true);
  }

  async function handleSaveReference(data) {
    let saved;

    if (editingReference) {
      saved = await candidateReferenceApi.update(editingReference.id, data);
    } else {
      saved = await candidateReferenceApi.create(data);
    }

    setCandidate((current) => ({
      ...current,

      references: editingReference
        ? current.references.map((item) =>
            item.id === saved.id ? saved : item,
          )
        : [...current.references, saved],
    }));

    await refreshProfileStrength();
  }

  async function handleDeleteReference(id) {
    await candidateReferenceApi.delete(id);

    setCandidate((current) => ({
      ...current,
      references: current.references.filter((item) => item.id !== id),
    }));

    await refreshProfileStrength();
  }

  async function handleSaveCareerPreferences(data) {
    const updated = await candidateCareerPreferencesApi.update(data);

    setCandidate((current) => ({
      ...current,
      careerPreferences: updated,
    }));

    await refreshProfileStrength();
  }

  async function handleSaveBasicProfile(data) {
    const updated = await candidateBasicProfileApi.update(data);

    setBasicProfile(updated);

    await refreshProfileStrength();
  }

  async function handleSaveCompensation(data) {
    const updated = await candidateCompensationApi.update(data);

    setCompensation(updated);

    await refreshProfileStrength();
  }

  async function handleSaveEmploymentVerification(data) {
    const updated = await candidateEmploymentVerificationApi.update(data);

    setEmploymentVerification(updated);

    await refreshProfileStrength();
  }

  async function handleTriggerEmploymentVerification() {
    const updated =
      await candidateEmploymentVerificationApi.triggerVerification();

    setEmploymentVerification(updated);
  }

  async function handleUploadEmploymentDocument(documentType, file) {
    try {
      const uploaded = await candidateEmploymentVerificationDocumentApi.upload(
        documentType,
        file,
      );

      setEmploymentVerification((current) => ({
        ...current,
        ...(documentType === "LAST_INCREMENT_LETTER"
          ? {
              lastIncrementLetter: uploaded,
            }
          : {
              relievingLetter: uploaded,
            }),
      }));

      await refreshProfileStrength();
    } catch (error) {
      console.error("Failed to upload employment document", error);
      throw error;
    }
  }

  async function handleDownloadEmploymentDocument(documentType, fileName) {
    try {
      const blob =
        await candidateEmploymentVerificationDocumentApi.download(documentType);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = fileName || `${documentType}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download employment document", error);
      throw error;
    }
  }

  async function handleDeleteEmploymentDocument(documentType) {
    try {
      await candidateEmploymentVerificationDocumentApi.delete(documentType);

      setEmploymentVerification((current) => ({
        ...current,
        ...(documentType === "LAST_INCREMENT_LETTER"
          ? {
              lastIncrementLetter: null,
            }
          : {
              relievingLetter: null,
            }),
      }));

      await refreshProfileStrength();
    } catch (error) {
      console.error("Failed to delete employment document", error);
      throw error;
    }
  }

  return (
    <Flex minH="100vh" bg="#F7F8FC">
      {/* Sidebar */}
      <Sidebar navigate={navigate} />

      {/* Main */}
      <Box flex="1" minW="0">
        {/* Top bar */}

        <CandidateHeader candidate={candidate} />

        {/* Content */}
        <Box
          maxW="1500px"
          mx="auto"
          px={{ base: 5, md: 8, xl: 10 }}
          py={{ base: 6, md: 8 }}
        >
          {/* Hero */}
          <Box mb={8}>
            <Text fontSize="sm" fontWeight="600" color="purple.600" mb={2}>
              YOUR CAREER WORKSPACE
            </Text>

            <Heading size={{ base: "lg", md: "xl" }} color="gray.800">
              Good morning, {firstName} 👋
            </Heading>

            <Text
              mt={2}
              fontSize={{ base: "sm", md: "md" }}
              color="gray.600"
              maxW="650px"
            >
              Let's build your professional story and connect you with the right
              opportunities.
            </Text>
          </Box>

          {/* Top cards */}
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5} mb={6}>
            <BasicProfileCard
              profile={basicProfile}
              onEdit={() => setIsBasicProfileOpen(true)}
            />

            <ResumeSection
              resume={resume}
              onUpload={handleUploadResume}
              onDownload={handleDownloadResume}
              onDelete={handleDeleteResume}
            />

            {/* <ResumeCard
              resume={candidate.resume}
              onUpload={() => navigate("/candidate/profile")}
            /> */}

            {/* <QuickActions candidate={candidate} navigate={navigate} /> */}
          </SimpleGrid>

          {/* Completion */}
          <CompletionCard
            candidate={candidate}
            completion={completion}
            navigate={navigate}
          />

          {/* Main content */}
          <Grid
            templateColumns={{
              base: "1fr",
              xl: "minmax(0, 2fr) minmax(300px, 1fr)",
            }}
            gap={5}
            mt={6}
          >
            <GridItem>
              <Stack spacing={5}>
                <ProfileStrengthCard
                  profileStrength={profileStrength}
                  onSectionAction={handleProfileSectionAction}
                />

                <ExperienceInsights analysis={employmentAnalysis} />
                <ExperienceSection
                  experiences={experiences}
                  onAdd={handleAddExperience}
                  onEdit={handleEditExperience}
                  onDelete={handleDeleteExperience}
                />

                <EducationSection
                  education={education}
                  onAdd={handleAddEducation}
                  onEdit={handleEditEducation}
                  onDelete={handleDeleteEducation}
                />

                {/* <ResumeSection
                  resume={resume}
                  onUpload={handleUploadResume}
                  onDownload={handleDownloadResume}
                  onDelete={handleDeleteResume}
                /> */}

                <CertificationsSection
                  certifications={candidate.certifications || []}
                  onAdd={handleAddCertification}
                  onEdit={handleEditCertification}
                  onDelete={handleDeleteCertification}
                />

                <AchievementsSection
                  achievements={candidate.achievements || []}
                  onAdd={handleAddAchievement}
                  onEdit={handleEditAchievement}
                  onDelete={handleDeleteAchievement}
                />

                <ReferencesSection
                  references={candidate.references || []}
                  onAdd={handleAddReference}
                  onEdit={handleEditReference}
                  onDelete={handleDeleteReference}
                />
              </Stack>
            </GridItem>

            <GridItem>
              <Stack spacing={5}>
                {/* <ProfileSummaryCard candidate={candidate} navigate={navigate} /> */}

                <CareerPreferencesCard
                  candidate={candidate}
                  onEdit={() => setCareerPreferencesDrawerOpen(true)}
                />

                <EmploymentVerificationCard
                  verification={employmentVerification}
                  currentlyEmployed={basicProfile?.currentlyEmployed}
                  onEdit={() => setEmploymentVerificationDrawerOpen(true)}
                />

                <CandidateCompensationCard
                  compensation={compensation}
                  onEdit={() => setIsCompensationOpen(true)}
                />
                {/* <OpportunityCard navigate={navigate} /> */}
              </Stack>
            </GridItem>
          </Grid>
        </Box>
        <ExperienceDrawer
          isOpen={experienceDrawerOpen}
          onClose={() => {
            setExperienceDrawerOpen(false);
            setEditingExperience(null);
          }}
          experience={editingExperience}
          onSave={handleSaveExperience}
        />
        <EducationDrawer
          isOpen={educationDrawerOpen}
          onClose={() => {
            setEducationDrawerOpen(false);
            setEditingEducation(null);
          }}
          education={editingEducation}
          onSave={handleSaveEducation}
        />

        <ResumeUploadDrawer
          isOpen={resumeDrawerOpen}
          onClose={() => setResumeDrawerOpen(false)}
          onSave={handleSaveResume}
        />

        <CertificationDrawer
          isOpen={certificationDrawerOpen}
          onClose={() => setCertificationDrawerOpen(false)}
          certification={editingCertification}
          onSave={handleSaveCertification}
        />

        <AchievementDrawer
          isOpen={achievementDrawerOpen}
          onClose={() => setAchievementDrawerOpen(false)}
          achievement={editingAchievement}
          onSave={handleSaveAchievement}
        />

        <ReferenceDrawer
          isOpen={referenceDrawerOpen}
          onClose={() => setReferenceDrawerOpen(false)}
          reference={editingReference}
          onSave={handleSaveReference}
        />

        <CareerPreferencesDrawer
          isOpen={careerPreferencesDrawerOpen}
          onClose={() => setCareerPreferencesDrawerOpen(false)}
          preferences={candidate.careerPreferences}
          onSave={handleSaveCareerPreferences}
        />
        <BasicProfileDrawer
          isOpen={isBasicProfileOpen}
          onClose={() => setIsBasicProfileOpen(false)}
          profile={basicProfile}
          onSave={handleSaveBasicProfile}
        />
        <CandidateCompensationDrawer
          isOpen={isCompensationOpen}
          onClose={() => setIsCompensationOpen(false)}
          compensation={compensation}
          onSave={handleSaveCompensation}
        />

        <EmploymentVerificationDrawer
          isOpen={employmentVerificationDrawerOpen}
          onClose={() => setEmploymentVerificationDrawerOpen(false)}
          verification={employmentVerification}
          currentlyEmployed={basicProfile?.currentlyEmployed}
          onSave={handleSaveEmploymentVerification}
          onTriggerVerification={handleTriggerEmploymentVerification}
          onUploadDocument={handleUploadEmploymentDocument}
          onDownloadDocument={handleDownloadEmploymentDocument}
          onDeleteDocument={handleDeleteEmploymentDocument}
        />
      </Box>
    </Flex>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar */
/* ------------------------------------------------------------------ */

function Sidebar({ navigate }) {
  return (
    <Box
      display={{ base: "none", lg: "block" }}
      w="245px"
      flexShrink={0}
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      minH="100vh"
      position="sticky"
      top="0"
      h="100vh"
    >
      <Flex
        h="72px"
        px={6}
        align="center"
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <HStack spacing={3}>
          <Box
            w="34px"
            h="34px"
            borderRadius="10px"
            bgGradient="linear(to-br, purple.500, blue.500)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontWeight="800"
            fontSize="lg"
          >
            S
          </Box>

          <Text fontWeight="800" letterSpacing="0.04em" color="gray.800">
            SPRINGBOARD
          </Text>
        </HStack>
      </Flex>

      <Stack spacing={1} px={4} py={6}>
        <SidebarSection title="WORKSPACE">
          <SidebarItem icon={FiGrid} label="Overview" active />
        </SidebarSection>

        <SidebarSection title="MY CAREER">
          <SidebarItem
            icon={FiUser}
            label="Profile"
            onClick={() => navigate("/candidate/profile")}
          />

          <SidebarItem
            icon={FiBriefcase}
            label="Experience"
            onClick={() => navigate("/candidate/profile")}
          />

          <SidebarItem
            icon={FiBookOpen}
            label="Education"
            onClick={() => navigate("/candidate/profile")}
          />

          <SidebarItem
            icon={FiAward}
            label="Certifications"
            onClick={() => navigate("/candidate/profile")}
          />
        </SidebarSection>

        <SidebarSection title="OPPORTUNITIES">
          <SidebarItem icon={FiBriefcase} label="Opportunities" muted />

          <SidebarItem
            icon={FiCheckCircle}
            label="Assessments"
            onClick={() => navigate("/candidate/assessments")}
          />
        </SidebarSection>

        <SidebarSection title="ACCOUNT">
          <SidebarItem icon={FiSettings} label="Settings" muted />
        </SidebarSection>
      </Stack>

      <Box
        position="absolute"
        bottom="20px"
        left="16px"
        right="16px"
        p={4}
        borderRadius="xl"
        bg="purple.50"
      >
        <Text fontSize="xs" fontWeight="700" color="purple.700">
          PROFILE TIP
        </Text>

        <Text mt={1} fontSize="xs" color="gray.600" lineHeight="1.5">
          A complete profile helps us understand your career better.
        </Text>
      </Box>
    </Box>
  );
}

function SidebarSection({ title, children }) {
  return (
    <Box mb={5}>
      <Text
        px={3}
        mb={2}
        fontSize="10px"
        fontWeight="700"
        letterSpacing="0.08em"
        color="gray.400"
      >
        {title}
      </Text>

      <Stack spacing={1}>{children}</Stack>
    </Box>
  );
}

function SidebarItem({ icon, label, active, onClick, muted }) {
  return (
    <Flex
      px={3}
      py={2.5}
      borderRadius="lg"
      align="center"
      gap={3}
      cursor={muted ? "default" : "pointer"}
      bg={active ? "purple.50" : "transparent"}
      color={active ? "purple.600" : muted ? "gray.400" : "gray.600"}
      _hover={
        muted
          ? {}
          : {
              bg: active ? "purple.50" : "gray.50",
            }
      }
      onClick={onClick}
    >
      <Icon as={icon} boxSize={4} />

      <Text fontSize="sm" fontWeight={active ? "600" : "500"}>
        {label}
      </Text>
    </Flex>
  );
}

/* ------------------------------------------------------------------ */
/* Top cards */
/* ------------------------------------------------------------------ */

function Card({ children, ...props }) {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="2xl"
      p={6}
      boxShadow="0 2px 8px rgba(15, 23, 42, 0.03)"
      {...props}
    >
      {children}
    </Box>
  );
}

function ResumeCard({ resume, onUpload }) {
  return (
    <Card>
      <HStack justify="space-between">
        <Text
          fontSize="xs"
          fontWeight="700"
          color="gray.500"
          letterSpacing="0.04em"
        >
          RESUME
        </Text>

        {resume ? (
          <Badge colorScheme="green" borderRadius="full">
            Uploaded
          </Badge>
        ) : (
          <Badge colorScheme="orange" borderRadius="full">
            Missing
          </Badge>
        )}
      </HStack>

      <HStack mt={6} spacing={4}>
        <Box
          w="48px"
          h="58px"
          borderRadius="lg"
          bg="purple.50"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FiFileText} boxSize={6} color="purple.600" />
        </Box>

        <Box>
          <Text fontWeight="700">
            {resume?.originalFileName || "Resume.pdf"}
          </Text>

          <Text mt={1} fontSize="sm" color="gray.500">
            {resume ? "Your resume is ready." : "Upload your latest resume."}
          </Text>
        </Box>
      </HStack>

      <HStack mt={6}>
        <Button
          size="sm"
          variant={resume ? "outline" : "solid"}
          colorScheme="purple"
          onClick={onUpload}
        >
          {resume ? "Manage Resume" : "Upload Resume"}
        </Button>
      </HStack>
    </Card>
  );
}

function QuickActions({ candidate, navigate }) {
  const actions = [
    {
      label: "Add Experience",
      description: "Tell us about your work history",
      icon: FiBriefcase,
    },
    {
      label: "Add Education",
      description: "Add your academic background",
      icon: FiBookOpen,
    },
    {
      label: "Add Certification",
      description: "Showcase your certifications",
      icon: FiAward,
    },
  ];

  return (
    <Card>
      <Text
        fontSize="xs"
        fontWeight="700"
        color="gray.500"
        letterSpacing="0.04em"
      >
        QUICK ACTIONS
      </Text>

      <Stack mt={4} spacing={1}>
        {actions.map((action) => (
          <Flex
            key={action.label}
            py={3}
            align="center"
            justify="space-between"
            cursor="pointer"
            borderRadius="lg"
            _hover={{ bg: "gray.50" }}
            onClick={() => navigate("/candidate/profile")}
          >
            <HStack spacing={3}>
              <Box
                w="36px"
                h="36px"
                borderRadius="lg"
                bg="gray.50"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={action.icon} color="purple.600" />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="600">
                  {action.label}
                </Text>

                <Text fontSize="xs" color="gray.500">
                  {action.description}
                </Text>
              </Box>
            </HStack>

            <Icon as={FiChevronRight} color="gray.400" />
          </Flex>
        ))}
      </Stack>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Completion */
/* ------------------------------------------------------------------ */

function CompletionCard({ candidate, completion, navigate }) {
  const steps = [
    {
      label: "Personal info",
      complete: Boolean(candidate.user?.fullName),
    },
    {
      label: "Contact info",
      complete:
        Boolean(candidate.user?.email) && Boolean(candidate.user?.phone),
    },
    {
      label: "Employment",
      complete: Boolean(candidate.user?.employmentSituation),
    },
    {
      label: "Experience",
      complete: candidate.experiences.length > 0,
    },
    {
      label: "Education",
      complete: candidate.education.length > 0,
    },
    {
      label: "Certifications",
      complete: candidate.certifications.length > 0,
    },
    {
      label: "Achievements",
      complete: candidate.achievements.length > 0,
    },
    {
      label: "Resume",
      complete: Boolean(candidate.resume),
    },
    {
      label: "Professional pitch",
      complete: Boolean(candidate.plainLanguagePitch),
    },
    {
      label: "Career preferences",
      complete:
        Boolean(candidate.workModePreference) ||
        Boolean(candidate.relocationPreference),
    },
  ];

  return (
    <Card>
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={3}
      >
        <Box>
          <Heading size="sm">Complete your profile</Heading>

          <Text mt={1} fontSize="sm" color="gray.500">
            Build a richer profile so Springboard can understand your career
            journey.
          </Text>
        </Box>

        <Text fontSize="sm" fontWeight="700" color="purple.600">
          {steps.filter((s) => s.complete).length} of {steps.length} completed
        </Text>
      </Flex>

      <Progress
        mt={5}
        value={completion}
        colorScheme="purple"
        borderRadius="full"
        size="sm"
      />

      <Flex mt={6} overflowX="auto" pb={2} gap={4}>
        {steps.map((step, index) => (
          <Box
            key={step.label}
            minW="95px"
            textAlign="center"
            cursor="pointer"
            onClick={() => navigate("/candidate/profile")}
          >
            <Box
              mx="auto"
              w="30px"
              h="30px"
              borderRadius="full"
              bg={step.complete ? "green.100" : "gray.100"}
              color={step.complete ? "green.600" : "gray.500"}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {step.complete ? (
                <Icon as={FiCheckCircle} />
              ) : (
                <Text fontSize="xs">{index + 1}</Text>
              )}
            </Box>

            <Text mt={2} fontSize="xs" fontWeight="600" color="gray.600">
              {step.label}
            </Text>
          </Box>
        ))}
      </Flex>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Career sections */
/* ------------------------------------------------------------------ */

function SectionHeader({ title, action, onAction }) {
  return (
    <Flex justify="space-between" align="center" mb={5}>
      <Heading size="sm">{title}</Heading>

      <Button size="sm" variant="ghost" colorScheme="purple" onClick={onAction}>
        + {action}
      </Button>
    </Flex>
  );
}

/* ------------------------------------------------------------------ */
/* Right column */
/* ------------------------------------------------------------------ */

function ProfileSummaryCard({ candidate, navigate }) {
  return (
    <Card>
      <Flex justify="space-between">
        <Heading size="sm">Profile Summary</Heading>

        <Text
          fontSize="sm"
          color="purple.600"
          cursor="pointer"
          onClick={() => navigate("/candidate/profile")}
        >
          Edit
        </Text>
      </Flex>

      <Text mt={5} fontSize="sm" lineHeight="1.7" color="gray.600">
        {candidate.plainLanguagePitch ||
          "Add a short professional summary that tells recruiters who you are and what you do."}
      </Text>

      {!candidate.plainLanguagePitch && (
        <Button
          mt={5}
          size="sm"
          variant="outline"
          colorScheme="purple"
          onClick={() => navigate("/candidate/profile")}
        >
          Add Summary
        </Button>
      )}
    </Card>
  );
}

function CareerPreferencesCard({ candidate, onEdit }) {
  const preferences = candidate.careerPreferences;

  const industries = preferences?.desiredIndustries || [];
  const locations = preferences?.desiredLocations || [];
  const languages = preferences?.languages || [];

  const hasPreferences =
    Boolean(preferences?.desiredTitle) ||
    locations.length > 0 ||
    industries.length > 0 ||
    languages.length > 0 ||
    Boolean(preferences?.openToRemote) ||
    preferences?.noticePeriod != null ||
    Boolean(preferences?.workAuthorization);

  return (
    <Card>
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="sm">Career Preferences</Heading>

          <Text mt={1} fontSize="xs" color="gray.500">
            What you're looking for next
          </Text>
        </Box>

        <Button size="sm" variant="ghost" colorScheme="purple" onClick={onEdit}>
          Edit
        </Button>
      </Flex>

      {!hasPreferences ? (
        <Box
          mt={5}
          p={5}
          border="1px dashed"
          borderColor="gray.300"
          borderRadius="xl"
        >
          <Text fontWeight="600" color="gray.700">
            Tell us what you're looking for next.
          </Text>

          <Text mt={1} fontSize="sm" color="gray.500">
            Add your target role, locations and work preferences.
          </Text>

          <Button mt={4} size="sm" colorScheme="purple" onClick={onEdit}>
            Add preferences
          </Button>
        </Box>
      ) : (
        <Stack mt={5} spacing={5}>
          <Preference label="Looking for" value={preferences?.desiredTitle} />

          {industries.length > 0 && (
            <PreferenceTags label="Industries" values={industries} />
          )}

          {locations.length > 0 && (
            <PreferenceTags label="Locations" values={locations} />
          )}

          <Preference
            label="Work preference"
            value={formatCareerPreference(preferences?.openToRemote)}
          />

          <Preference
            label="Notice period"
            value={
              preferences?.noticePeriod != null
                ? `${preferences.noticePeriod} days`
                : "Not specified"
            }
          />

          <Preference
            label="Work authorization"
            value={formatCareerPreference(preferences?.workAuthorization)}
          />

          {languages.length > 0 && (
            <PreferenceTags label="Languages" values={languages} />
          )}
        </Stack>
      )}
    </Card>
  );
}

function Preference({ label, value }) {
  return (
    <Flex justify="space-between" gap={4}>
      <Text fontSize="sm" color="gray.500">
        {label}
      </Text>

      <Text fontSize="sm" fontWeight="600" textAlign="right">
        {value || "Not specified"}
      </Text>
    </Flex>
  );
}

function OpportunityCard({ navigate }) {
  return (
    <Box
      borderRadius="2xl"
      p={6}
      bgGradient="linear(to-br, purple.600, purple.500)"
      color="white"
      overflow="hidden"
      position="relative"
    >
      <Text fontSize="xs" fontWeight="700" letterSpacing="0.04em" opacity={0.8}>
        WHAT'S NEXT?
      </Text>

      <Heading mt={3} size="md">
        Your next opportunity could start here.
      </Heading>

      <Text mt={3} fontSize="sm" opacity={0.9}>
        Complete your profile first. We'll use your career story and preferences
        to help identify relevant opportunities.
      </Text>

      <Button
        mt={5}
        bg="white"
        color="purple.600"
        _hover={{ bg: "gray.100" }}
        onClick={() => navigate("/candidate/profile")}
      >
        Complete Profile
        <Icon as={FiChevronRight} ml={2} />
      </Button>
    </Box>
  );
}

function EmptyState({ icon, title, text, action, onClick }) {
  return (
    <Box
      py={8}
      textAlign="center"
      border="1px dashed"
      borderColor="gray.200"
      borderRadius="xl"
    >
      <Box
        mx="auto"
        w="48px"
        h="48px"
        borderRadius="xl"
        bg="gray.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={icon} color="gray.400" boxSize={5} />
      </Box>

      <Text mt={4} fontWeight="600">
        {title}
      </Text>

      <Text mt={1} fontSize="sm" color="gray.500" maxW="420px" mx="auto">
        {text}
      </Text>

      <Button
        mt={4}
        size="sm"
        variant="outline"
        colorScheme="purple"
        onClick={onClick}
      >
        {action}
      </Button>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */

function PreferenceTags({ label, values }) {
  return (
    <Box>
      <Text fontSize="xs" fontWeight="600" color="gray.500" mb={2}>
        {label}
      </Text>

      <Flex gap={2} flexWrap="wrap">
        {values.map((value) => (
          <Tag key={value} size="sm" borderRadius="full" colorScheme="purple">
            {value}
          </Tag>
        ))}
      </Flex>
    </Box>
  );
}

function formatCareerPreference(value) {
  if (!value) {
    return "Not specified";
  }

  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function calculateProfileCompletion(candidate) {
  const checks = [
    Boolean(candidate.user?.fullName),
    Boolean(candidate.user?.email),
    Boolean(candidate.user?.phone),
    Boolean(candidate.user?.location),
    Boolean(candidate.user?.employmentSituation),
    candidate.experiences?.length > 0,
    candidate.education?.length > 0,
    candidate.certifications?.length > 0,
    candidate.achievements?.length > 0,
    Boolean(candidate.resume),
    Boolean(candidate.plainLanguagePitch),
    Boolean(candidate.functionalArea),
  ];

  const completed = checks.filter(Boolean).length;

  return Math.round((completed / checks.length) * 100);
}

function formatValue(value) {
  if (!value) {
    return "";
  }

  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  return date.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}
