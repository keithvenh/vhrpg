import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../db/application/db";

export default async function AddCharacter(displayName,species,type) {

    let key = displayName.replace(" ","-").toLowerCase()

    await setDoc(doc(db,"characters", key), {
        attributes: {
            defense: 0,
            encumbrance: 0,
            encumbranceThreshold: 0,
            forceRating: 0,
            meleeDefense: 0,
            rangedDefense: 0,
            soak: 0,
            strain: 0,
            strainThreshold: 0,
            woundThreshold: 0,
            wounds: 0
        },
        background: {
            duty: {
        
            },
            morality: {
                conflict: 0,
                rank: 0
            },
            motivations: {
        
            },
            obligation: {
        
            },
            species: species,
            synopsis: ""
        },
        characteristics: {
            agility: 0,
            brawn: 0,
            cunning: 0,
            intellect: 0,
            presence: 0,
            willpower: 0
        },
        credits: {
            lifetime: 0,
            available: 0
        },
        displayName: displayName,
        experience: {
            lifetime: 0,
            available: 0
        },
        skills: {
            astrogation: {
                career: false,
                category: "general",
                characteristic: "intellect",
                rank: 0,
                title: "Astrogation",
                xp: 0
            },
            athletics: {
                career: false,
                category: "general",
                characteristic: "brawn",
                rank: 0,
                title: "Athletics",
                xp: 0
            },
            charm: {
                career: false,
                category: "general",
                characteristic: "presence",
                rank: 0,
                title: "Charm",
                xp: 0
            },
            coercion: {
                career: false,
                category: "general",
                characteristic: "willpower",
                rank: 0,
                title: "Coercion",
                xp: 0
            },
            computers: {
                career: false,
                category: "general",
                characteristic: "intellect",
                rank: 0,
                title: "Computers",
                xp: 0
            },
            cool: {
                career: false,
                category: "general",
                characteristic: "presence",
                rank: 0,
                title: "Cool",
                xp: 0
            },
            coordination: {
                career: false,
                category: "general",
                characteristic: "agility",
                rank: 0,
                title: "Coordination",
                xp: 0
            },
            deception: {
                career: false,
                category: "general",
                characteristic: "cunning",
                rank: 0,
                title: "Deception",
                xp: 0
            },
            discipline: {
                career: false,
                category: "general",
                characteristic: "willpower",
                rank: 0,
                title: "Discipline",
                xp: 0
            },
            leadership: {
                career: false,
                category: "general",
                characteristic: "presence",
                rank: 0,
                title: "Leadership",
                xp: 0
            },
            mechanics: {
                career: false,
                category: "general",
                characteristic: "intellect",
                rank: 0,
                title: "Mechanics",
                xp: 0
            },
            medicine: {
                career: false,
                category: "general",
                characteristic: "intellect",
                rank: 0,
                title: "Medicine",
                xp: 0
            },
            negotiation: {
                career: false,
                category: "general",
                characteristic: "presence",
                rank: 0,
                title: "Negotiation",
                xp: 0
            },
            perception: {
                career: false,
                category: "general",
                characteristic: "cunning",
                rank: 0,
                title: "Perception",
                xp: 0
            },
            pilotingPlanetary: {
                career: false,
                category: "general",
                characteristic: "agility",
                rank: 0,
                title: "Piloting-Planetary",
                xp: 0
            },
            pilotingSpace: {
                career: false,
                category: "general",
                characteristic: "agility",
                rank: 0,
                title: "Piloting-Space",
                xp: 0
            },
            resilience: {
                career: false,
                category: "general",
                characteristic: "brawn",
                rank: 0,
                title: "Resilience",
                xp: 0
            },
            skullduggery: {
                career: false,
                category: "general",
                characteristic: "cunning",
                rank: 0,
                title: "Skullduggery",
                xp: 0
            },
            stealth: {
                career: false,
                category: "general",
                characteristic: "agility",
                rank: 0,
                title: "Stealth",
                xp: 0
            },
            streetwise: {
                career: false,
                category: "general",
                characteristic: "cunning",
                rank: 0,
                title: "Streetwise",
                xp: 0
            },
            survival: {
                career: false,
                category: "general",
                characteristic: "cunning",
                rank: 0,
                title: "Survival",
                xp: 0
            },
            vigilance: {
                career: false,
                category: "general",
                characteristic: "willpower",
                rank: 0,
                title: "Vigilance",
                xp: 0
            },
            brawl: {
                career: false,
                category: "combat",
                characteristic: "brawn",
                rank: 0,
                title: "Brawl",
                xp: 0
            },
            melee: {
                career: false,
                category: "combat",
                characteristic: "brawn",
                rank: 0,
                title: "Melee",
                xp: 0
            },
            lightsaber: {
                career: false,
                category: "combat",
                characteristic: "brawn",
                rank: 0,
                title: "Lightsaber",
                xp: 0
            },
            rangedLight: {
                career: false,
                category: "combat",
                characteristic: "agility",
                rank: 0,
                title: "Ranged-Light",
                xp: 0
            },
            rangedHeavy: {
                career: false,
                category: "combat",
                characteristic: "agility",
                rank: 0,
                title: "Ranged-Heavy",
                xp: 0
            },
            gunnery: {
                career: false,
                category: "combat",
                characteristic: "agility",
                rank: 0,
                title: "Gunnery",
                xp: 0
            },
            coreWorlds: {
                career: false,
                category: "knowledge",
                characteristic: "intellect",
                rank: 0,
                title: "Core-Worlds",
                xp: 0
            },
            education: {
                career: false,
                category: "knowledge",
                characteristic: "intellect",
                rank: 0,
                title: "Education",
                xp: 0
            },
            lore: {
                career: false,
                category: "knowledge",
                characteristic: "intellect",
                rank: 0,
                title: "Lore",
                xp: 0
            },
            outerRim: {
                career: false,
                category: "knowledge",
                characteristic: "intellect",
                rank: 0,
                title: "Outer-Rim",
                xp: 0
            },
            underworld: {
                career: false,
                category: "knowledge",
                characteristic: "intellect",
                rank: 0,
                title: "Underworld",
                xp: 0
            },
            xenology: {
                career: false,
                category: "knowledge",
                characteristic: "intellect",
                rank: 0,
                title: "Xenology",
                xp: 0
            },
            warfare: {
                career: false,
                category: "knowledge",
                characteristic: "intellect",
                rank: 0,
                title: "Warfare",
                xp: 0
            }
        },
        type: type
    });
}