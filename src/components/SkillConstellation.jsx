import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SKILL_NODES, SKILL_GROUPS } from "../constants/data";
import { SKILL_ICONS } from "../constants/skillIcons";

const WIDTH = 760;
const HEIGHT = 620;
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };
const GROUP_RADIUS = 210;

function buildLayout() {
  const groups = [...new Set(SKILL_NODES.map((n) => n.group))];
  const groupPositions = {};

  groups.forEach((group, i) => {
    const angle = (i / groups.length) * Math.PI * 2 - Math.PI / 2;
    groupPositions[group] = {
      x: CENTER.x + Math.cos(angle) * GROUP_RADIUS,
      y: CENTER.y + Math.sin(angle) * GROUP_RADIUS,
    };
  });

  const nodesByGroup = groups.map((group) => ({
    group,
    nodes: SKILL_NODES.filter((n) => n.group === group),
  }));

  const positioned = [];
  nodesByGroup.forEach(({ group, nodes }) => {
    const gPos = groupPositions[group];
    const localRadius = 96;
    nodes.forEach((node, i) => {
      const angle = (i / nodes.length) * Math.PI * 2 + Math.PI / 5;
      positioned.push({
        ...node,
        x: gPos.x + Math.cos(angle) * localRadius,
        y: gPos.y + Math.sin(angle) * localRadius,
      });
    });
  });

  return { groupPositions, positioned };
}

export default function SkillConstellation() {
  const { groupPositions, positioned } = useMemo(buildLayout, []);
  const [hovered, setHovered] = useState(null);

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        role="img"
        aria-label="Constellation diagram of Haziq's skills, grouped by category"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* core -> group lines */}
        {Object.entries(groupPositions).map(([group, pos]) => (
          <motion.line
            key={`core-${group}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={pos.x}
            y2={pos.y}
            stroke="var(--color-line)"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        ))}

        {/* group -> node lines */}
        {positioned.map((node) => {
          const gPos = groupPositions[node.group];
          return (
            <motion.line
              key={`line-${node.id}`}
              x1={gPos.x}
              y1={gPos.y}
              x2={node.x}
              y2={node.y}
              stroke={SKILL_GROUPS[node.group].color}
              strokeOpacity={0.25}
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          );
        })}

        {/* core node */}
        <circle cx={CENTER.x} cy={CENTER.y} r={46} fill="url(#coreGlow)" opacity={0.5} />
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={22}
          fill="var(--color-surface-2)"
          stroke="var(--color-accent)"
          strokeWidth={1.5}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        />
        <text
          x={CENTER.x}
          y={CENTER.y + 4}
          textAnchor="middle"
          className="font-mono"
          fontSize="10"
          fill="var(--color-ink)"
        >
          HS
        </text>

        {/* group labels */}
        {Object.entries(groupPositions).map(([group, pos]) => (
          <text
            key={`label-${group}`}
            x={pos.x}
            y={pos.y - 100}
            textAnchor="middle"
            className="font-mono uppercase"
            fontSize="10"
            letterSpacing="2"
            fill={SKILL_GROUPS[group].color}
            opacity={0.8}
          >
            {SKILL_GROUPS[group].label}
          </text>
        ))}

        {/* skill nodes */}
        {positioned.map((node, i) => {
          const isHovered = hovered === node.id;
          const r = 11 + node.weight * 9;
          const icon = SKILL_ICONS[node.id];
          const iconSize = r * 1.15;

          return (
            <g
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
              style={{ cursor: "pointer" }}
            >
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={SKILL_GROUPS[node.group].color}
                fillOpacity={isHovered ? 1 : 0.82}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                animate={{
                  cy: [node.y, node.y - 5, node.y],
                }}
                transition={{
                  scale: { type: "spring", stiffness: 260, damping: 16, delay: 0.5 + i * 0.03 },
                  opacity: { duration: 0.4, delay: 0.5 + i * 0.03 },
                  cy: {
                    duration: 3 + (i % 5) * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  },
                }}
                stroke={isHovered ? "var(--color-ink)" : "transparent"}
                strokeWidth={1.5}
              />

              {icon?.type === "path" && (
                <g
                  transform={`translate(${node.x - iconSize / 2}, ${
                    node.y - iconSize / 2
                  }) scale(${iconSize / 24})`}
                  pointerEvents="none"
                >
                  <title>{icon.title}</title>
                  <path d={icon.path} fill="var(--color-void)" />
                </g>
              )}

              {icon?.type === "lucide" && (
                <foreignObject
                  x={node.x - iconSize / 2}
                  y={node.y - iconSize / 2}
                  width={iconSize}
                  height={iconSize}
                  pointerEvents="none"
                >
                  <icon.Icon
                    width={iconSize}
                    height={iconSize}
                    color="var(--color-void)"
                    strokeWidth={2.2}
                  />
                </foreignObject>
              )}

              <text
                x={node.x}
                y={node.y + r + 16}
                textAnchor="middle"
                fontSize="10.5"
                fontFamily="var(--font-mono)"
                fill={isHovered ? "var(--color-ink)" : "var(--color-ink-faint)"}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
