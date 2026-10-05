import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authApi } from "../../api/authApi";
import { candidateApi } from "../../api/candidateApi";
import { clearAuth } from "../../store/authSlice";
import { profileStrengthApi } from "../../api/candidateProfileStrengthApi";

import Sidebar from "../../components/candidate/Sidebar";
import CandidateHeader from "../../components/candidate/CandidateHeader";
import CandidateHero from "../../components/candidate/CandidateHero";

import ProfessionalSnapshotSection from "../../components/candidate/sections/ProfessionalSnapshotSection";
import ProfessionalSnapshotDrawer from "../../components/candidate/drawers/ProfessionalSnapshotDrawer";

import ExperienceSection from "../../components/candidate/sections/ExperienceSection";
import ExperienceDrawer from "../../components/candidate/drawers/ExperienceDrawer";
import { candidateExperienceApi } from "../../api/candidateExperienceApi";

import EducationSection from "../../components/candidate/sections/EducationSection";
import EducationDrawer from "../../components/candidate/drawers/EducationDrawer";
import { candidateEducationApi } from "../../api/candidateEducationApi";

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

import CareerPreferencesCard from "../../components/candidate/sections/CareerPreferencesCard";
import CareerPreferencesDrawer from "../../components/candidate/drawers/CareerPreferencesDrawer";
import { candidateCareerPreferencesApi } from "../../api/candidateCareerPreferencesApi";

import BasicProfileDrawer from "../../components/candidate/drawers/BasicProfileDrawer";
import { candidateBasicProfileApi } from "../../api/candidateBasicProfileApi";

import CandidateCompensationCard from "../../components/candidate/sections/CandidateCompensationCard";
import CandidateCompensationDrawer from "../../components/candidate/drawers/CandidateCompensationDrawer";
import { candidateCompensationApi } from "../../api/candidateCompensationApi";

import EmploymentVerificationCard from "../../components/candidate/sections/EmploymentVerificationCard";
import EmploymentVerificationDrawer from "../../components/candidate/drawers/EmploymentVerificationDrawer";
import { candidateEmploymentVerificationApi } from "../../api/candidateEmploymentVerificationApi";
import { candidateEmploymentVerificationDocumentApi } from "../../api/candidateEmploymentVerificationDocumentApi";

import { candidateCareerSummaryApi } from "../../api/candidateCareerSummaryApi";
import { candidateIndustryApi } from "../../api/candidateIndustryApi";
import { candidateSkillApi } from "../../api/candidateSkillApi";

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

  const [careerSummary, setCareerSummary] = useState(null);

  const [industries, setIndustries] = useState([]);
  const [selectedIndustryIds, setSelectedIndustryIds] = useState([]);

  const [skills, setSkills] = useState([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState([]);

  const [professionalSnapshotOpen, setProfessionalSnapshotOpen] =
    useState(false);

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
        careerSummaryData,
        availableIndustries,
        selectedIndustries,
        availableSkills,
        selectedSkills,
      ] = await Promise.all([
        candidateApi.getMe(),
        profileStrengthApi.get(),
        candidateBasicProfileApi.get(),
        candidateCompensationApi.get(),
        candidateEmploymentVerificationApi.get(),
        candidateExperienceApi.getAnalysis(),
        candidateCareerSummaryApi.get(),
        candidateIndustryApi.getAvailable(),
        candidateIndustryApi.getSelected(),
        candidateSkillApi.getAvailable(),
        candidateSkillApi.getSelected(),
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

      setCareerSummary(careerSummaryData);

      setIndustries(availableIndustries || []);

      setSelectedIndustryIds(
        (selectedIndustries || []).map((item) => item.industryTagId),
      );

      setSkills(availableSkills || []);

      setSelectedSkillIds(
        (selectedSkills || []).map((item) => item.skillTagId),
      );
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
      <Flex minH="100vh" align="center" justify="center" bg="cream.100">
        <Stack align="center" spacing={5}>
          <Box
            w="48px"
            h="48px"
            bg="white"
            border="1px solid"
            borderColor="cream.300"
            borderRadius="4px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="sm" thickness="2px" color="accent.500" />
          </Box>

          <Stack spacing={1} textAlign="center">
            <Text fontFamily="heading" fontSize="lg" color="brand.500">
              Preparing your workspace
            </Text>

            <Text fontSize="sm" color="taupe.500">
              Loading your professional profile.
            </Text>
          </Stack>
        </Stack>
      </Flex>
    );
  }

  if (error) {
    return (
      <Box minH="100vh" bg="cream.100" p={{ base: 6, md: 10 }}>
        <Box maxW="760px" mx="auto">
          <Alert
            status="error"
            borderRadius="5px"
            bg="error.50"
            border="1px solid"
            borderColor="error.200"
          >
            <AlertIcon color="error.600" />
            <Text color="error.700">{error}</Text>
          </Alert>
        </Box>
      </Box>
    );
  }

  if (!candidate) {
    return null;
  }

  const completion = calculateProfileCompletion(candidate);

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

  async function handleSaveProfessionalSnapshot({
    summary,
    industryIds,
    skillIds,
  }) {
    const [savedSummary, savedIndustries, savedSkills] = await Promise.all([
      candidateCareerSummaryApi.update({
        summary,
      }),

      candidateIndustryApi.update(industryIds),

      candidateSkillApi.update(skillIds),
    ]);

    setCareerSummary(savedSummary);

    setSelectedIndustryIds(
      (savedIndustries || []).map((item) => item.industryTagId),
    );

    setSelectedSkillIds((savedSkills || []).map((item) => item.skillTagId));

    await refreshProfileStrength();
  }

  return (
    <Flex minH="100vh" bg="cream.100">
      {/* =========================================================
          SIDEBAR
      ========================================================== */}

      <Sidebar
        navigate={navigate}
        onOpenBasicProfile={() => setIsBasicProfileOpen(true)}
        onOpenExperience={handleAddExperience}
        onOpenEducation={handleAddEducation}
        onOpenCertification={handleAddCertification}
        onOpenAchievement={handleAddAchievement}
        onOpenReference={handleAddReference}
        onOpenCareerPreferences={() => setCareerPreferencesDrawerOpen(true)}
        onOpenResume={handleUploadResume}
        onOpenCompensation={() => setIsCompensationOpen(true)}
        onOpenEmploymentVerification={() =>
          setEmploymentVerificationDrawerOpen(true)
        }
        onLogout={logout}
      />

      {/* =========================================================
          MAIN
      ========================================================== */}

      <Box flex="1" minW="0" bg="cream.100">
        {/* <CandidateHeader candidate={candidate} /> */}

        <Box
          maxW="1500px"
          mx="auto"
          px={{
            base: 5,
            md: 8,
            xl: 10,
          }}
          py={{
            base: 6,
            md: 8,
          }}
        >
          {/* =====================================================
              WORKSPACE
          ====================================================== */}

          <Box mt={8}>
            <Flex
              align={{
                base: "flex-start",
                md: "center",
              }}
              justify="space-between"
              direction={{
                base: "column",
                md: "row",
              }}
              gap={2}
              mb={5}
            >
              <Box>
                <Text
                  fontSize="10px"
                  fontWeight="800"
                  letterSpacing="0.16em"
                  color="accent.600"
                >
                  YOUR PROFESSIONAL STORY
                </Text>

                <Text
                  fontFamily="heading"
                  fontSize="2xl"
                  fontWeight="500"
                  color="brand.500"
                  mt={1}
                >
                  Your career, thoughtfully presented.
                </Text>
              </Box>
            </Flex>

            <Box
              display={{
                base: "block",
                xl: "grid",
              }}
              gridTemplateColumns="minmax(0, 2fr) minmax(300px, 1fr)"
              gap={5}
            >
              {/* =================================================
                  LEFT COLUMN
              ================================================== */}

              <Stack spacing={5}>
                <CandidateHero
                  candidate={candidate}
                  profileStrength={profileStrength}
                  completion={completion}
                  basicProfile={basicProfile}
                  onEditProfile={() => navigate("/candidate/profile")}
                  onEditBasicProfile={() => setIsBasicProfileOpen(true)}
                />

                <ProfessionalSnapshotSection
                  careerSummary={careerSummary}
                  industries={industries}
                  selectedIndustryIds={selectedIndustryIds}
                  skills={skills}
                  selectedSkillIds={selectedSkillIds}
                  onEdit={() => setProfessionalSnapshotOpen(true)}
                />

                <ExperienceSection
                  experiences={experiences}
                  onAdd={handleAddExperience}
                  onEdit={handleEditExperience}
                  onDelete={handleDeleteExperience}
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

                <EducationSection
                  education={education}
                  onAdd={handleAddEducation}
                  onEdit={handleEditEducation}
                  onDelete={handleDeleteEducation}
                />

                <CertificationsSection
                  certifications={candidate.certifications || []}
                  onAdd={handleAddCertification}
                  onEdit={handleEditCertification}
                  onDelete={handleDeleteCertification}
                />
              </Stack>

              {/* =================================================
                  RIGHT COLUMN
              ================================================== */}

              <Stack spacing={5}>
                <CareerPreferencesCard
                  candidate={candidate}
                  onEdit={() => setCareerPreferencesDrawerOpen(true)}
                />

                <CandidateCompensationCard
                  compensation={compensation}
                  onEdit={() => setIsCompensationOpen(true)}
                />

                <ResumeSection
                  resume={resume}
                  onUpload={handleUploadResume}
                  onDownload={handleDownloadResume}
                  onDelete={handleDeleteResume}
                />

                <EmploymentVerificationCard
                  verification={employmentVerification}
                  currentlyEmployed={basicProfile?.currentlyEmployed}
                  onEdit={() => setEmploymentVerificationDrawerOpen(true)}
                />
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* =======================================================
            DRAWERS
        ======================================================== */}

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
          onClose={() => {
            setCertificationDrawerOpen(false);
            setEditingCertification(null);
          }}
          certification={editingCertification}
          onSave={handleSaveCertification}
        />

        <AchievementDrawer
          isOpen={achievementDrawerOpen}
          onClose={() => {
            setAchievementDrawerOpen(false);
            setEditingAchievement(null);
          }}
          achievement={editingAchievement}
          onSave={handleSaveAchievement}
        />

        <ReferenceDrawer
          isOpen={referenceDrawerOpen}
          onClose={() => {
            setReferenceDrawerOpen(false);
            setEditingReference(null);
          }}
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

        <ProfessionalSnapshotDrawer
          isOpen={professionalSnapshotOpen}
          onClose={() => setProfessionalSnapshotOpen(false)}
          careerSummary={careerSummary}
          industries={industries}
          selectedIndustryIds={selectedIndustryIds}
          skills={skills}
          selectedSkillIds={selectedSkillIds}
          onSave={handleSaveProfessionalSnapshot}
        />
      </Box>
    </Flex>
  );
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
