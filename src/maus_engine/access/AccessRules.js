// C:\Users\MrBitcoin\Documents\GitHub\maus\01frontend\maus-ui\src\maus-engine\access\AccessRules.js
// MAUS ENGINE — Central identity + portal access logic (scales to planets, portals, roles, tiers)

const TIER = {
  STANDARD: "STANDARD",
  ENHANCED: "ENHANCED",
  PROFESSIONAL: "PROFESSIONAL",
  AERO_GOV: "AERO_GOV",
  PREMIUM: "PREMIUM",
  FOUNDER: "FOUNDER",
};

// Higher number = higher authority / visual power
const TIER_RANK = {
  [TIER.STANDARD]: 1,
  [TIER.ENHANCED]: 2,
  [TIER.PROFESSIONAL]: 3,
  [TIER.AERO_GOV]: 4,
  [TIER.PREMIUM]: 5,
  [TIER.FOUNDER]: 6,
};

const PROFESSIONAL_ROLES = ["doctor", "nurse", "specialist"];
const AERO_GOV_ORGS = ["NASA", "SPACEX", "GOVERNMENT"];

// --- Helpers ---

function isProfessional(identity) {
  if (!identity || !identity.role) return false;
  return PROFESSIONAL_ROLES.includes(String(identity.role).toLowerCase());
}

function isAeroGov(identity) {
  if (!identity || !identity.org) return false;
  const org = String(identity.org).toUpperCase();
  return AERO_GOV_ORGS.includes(org);
}

function getSubscriptionLevel(identity) {
  if (!identity || !identity.subscription) return "standard";
  return String(identity.subscription).toLowerCase(); // "standard", "enhanced", "premium"
}

// --- Core tier resolution ---

export function getPortalTier(identity) {
  if (identity && identity.isFounder) {
    return TIER.FOUNDER;
  }

  const sub = getSubscriptionLevel(identity);

  // Premium subscription gets strong visual tier
  if (sub === "premium") {
    return TIER.PREMIUM;
  }

  // NASA / SPACEX / GOVERNMENT tier, above professional, below premium
  if (isAeroGov(identity)) {
    return TIER.AERO_GOV;
  }

  // Doctors / nurses / specialists
  if (isProfessional(identity)) {
    return TIER.PROFESSIONAL;
  }

  // Enhanced standard
  if (sub === "enhanced") {
    return TIER.ENHANCED;
  }

  // Default base
  return TIER.STANDARD;
}

// --- Visual style resolver ---

export function resolvePortalVisuals(identity) {
  const tier = getPortalTier(identity) || TIER.STANDARD;
  const base = {
    color: "#00F6FF",
    glowIntensity: 0.8,
    particleLevel: 0.3,
    styleKey: "standard_core",
  };

  if (!identity) {
    return base;
  }

  const role = identity.role ? String(identity.role).toLowerCase() : "";
  const org = identity.org ? String(identity.org).toUpperCase() : "";

  // Founder — top of the pyramid
  if (tier === TIER.FOUNDER) {
    return {
      color: "#00CFFF",
      glowIntensity: 2.0,
      particleLevel: 1.0,
      styleKey: "founder_singularity_prism_core",
    };
  }

  // Premium — gold / violet / red storm
  if (tier === TIER.PREMIUM) {
    // default premium look (can be refined later)
    return {
      color: "#FFCC33", // Solar Gold
      glowIntensity: 1.6,
      particleLevel: 0.9,
      styleKey: "premium_solar_gold",
    };
  }

  // Aerospace / Government tier
  if (tier === TIER.AERO_GOV) {
    if (org === "NASA") {
      return {
        color: "#7CD0FF",
        glowIntensity: 1.3,
        particleLevel: 0.7,
        styleKey: "nasa_ion_core",
      };
    }
    if (org === "SPACEX") {
      return {
        color: "#00A3FF",
        glowIntensity: 1.5,
        particleLevel: 0.9,
        styleKey: "spacex_falcon_core",
      };
    }
    if (org === "GOVERNMENT") {
      return {
        color: "#CFAF60",
        glowIntensity: 1.2,
        particleLevel: 0.6,
        styleKey: "gov_stealth_authority",
      };
    }
  }

  // Professional — doctor / nurse / specialist
  if (tier === TIER.PROFESSIONAL) {
    if (role === "doctor") {
      return {
        color: "#FFFFFF",
        glowIntensity: 1.4,
        particleLevel: 0.7,
        styleKey: "med_doctor_core",
      };
    }
    if (role === "nurse") {
      return {
        color: "#FF77A8",
        glowIntensity: 1.2,
        particleLevel: 0.6,
        styleKey: "med_nurse_core",
      };
    }
    if (role === "specialist") {
      return {
        color: "#00F7FF",
        glowIntensity: 1.3,
        particleLevel: 0.8,
        styleKey: "med_specialist_core",
      };
    }
  }

  // Enhanced standard
  if (tier === TIER.ENHANCED) {
    return {
      color: "#66CCFF",
      glowIntensity: 1.0,
      particleLevel: 0.5,
      styleKey: "enhanced_standard_core",
    };
  }

  // Standard base
  return base;
}

// --- Authority rank helpers ---

export function getTierRank(identity) {
  const tier = getPortalTier(identity);
  return TIER_RANK[tier] || TIER_RANK[TIER.STANDARD];
}

// --- Portal / planet access checks ---

export function canEnterPortal(identity, portalConfig = {}) {
  // Founders bypass all restrictions
  if (identity && identity.isFounder) {
    return true;
  }

  const userTierRank = getTierRank(identity);

  // If portalConfig specifies a minimum tier rank, enforce it
  if (typeof portalConfig.minimumTierRank === "number") {
    if (userTierRank < portalConfig.minimumTierRank) {
      return false;
    }
  }

  // Org restrictions
  if (portalConfig.allowedOrgs && portalConfig.allowedOrgs.length > 0) {
    const org = identity && identity.org ? String(identity.org).toUpperCase() : "";
    if (!portalConfig.allowedOrgs.includes(org)) {
      return false;
    }
  }

  // Role restrictions
  if (portalConfig.allowedRoles && portalConfig.allowedRoles.length > 0) {
    const role = identity && identity.role ? String(identity.role).toLowerCase() : "";
    if (!portalConfig.allowedRoles.includes(role)) {
      return false;
    }
  }

  // If explicitly restricted and no identity, deny
  if (portalConfig.restricted && !identity) {
    return false;
  }

  // Default to allow
  return true;
}

// Stub for future planet-specific access logic
export function canAccessPlanet(identity, planetId, planetConfig = {}) {
  // Founder can access all planets
  if (identity && identity.isFounder) {
    return true;
  }

  // If planetConfig carries its own restrictions, enforce similarly
  if (planetConfig.minimumTierRank) {
    const userTierRank = getTierRank(identity);
    if (userTierRank < planetConfig.minimumTierRank) {
      return false;
    }
  }

  // Extend later with NASA / SPACEX / GOV / Medical / Premium specific rules
  return true;
}
