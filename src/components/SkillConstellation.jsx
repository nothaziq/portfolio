import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SKILL_NODES, SKILL_GROUPS } from "../constants/data";
import { SKILL_ICONS } from "../constants/skillIcons";

const WIDTH = 1700;
const HEIGHT = 1600;
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };
const GROUP_RADIUS = 480;
const CORE_RADIUS = 54;
const PADDING = 56; // keeps circles AND their text labels from colliding

function nodeRadius(weight) {
  return 20 + weight * 20;
}

function resolveCollisions(nodes, fixedObstacles, iterations = 300) {
  for (let iter = 0; iter < iterations; iter++) {
    let moved = false;

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];

      // push apart from other skill nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const minDist = a.r + b.r + PADDING;
        if (dist < minDist) {
          moved = true;
          const overlap = (minDist - dist) / 2;
          const ux = dx / dist;
          const uy = dy / dist;
          a.x -= ux * overlap;
          a.y -= uy * overlap;
          b.x += ux * overlap;
          b.y += uy * overlap;
        }
      }

      // push away from fixed obstacles (the core node)
      for (const obstacle of fixedObstacles) {
        const dx = a.x - obstacle.x;
        const dy = a.y - obstacle.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const minDist = a.r + obstacle.r + PADDING;
        if (dist < minDist) {
          moved = true;
          const overlap = minDist - dist;
          a.x += (dx / dist) * overlap;
          a.y += (dy / dist) * overlap;
        }
      }
    }

    if (!moved) break;
  }
}

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
    // more nodes in a cluster => wider local radius so they don't crowd
    const localRadius = 110 + nodes.length * 34;
    nodes.forEach((node, i) => {
      const angle = (i / nodes.length) * Math.PI * 2 + Math.PI / 5;
      positioned.push({
        ...node,
        r: nodeRadius(node.weight),
        targetX: gPos.x + Math.cos(angle) * localRadius,
        targetY: gPos.y + Math.sin(angle) * localRadius,
        x: gPos.x + Math.cos(angle) * localRadius,
        y: gPos.y + Math.sin(angle) * localRadius,
      });
    });
  });

  resolveCollisions(positioned, [{ x: CENTER.x, y: CENTER.y, r: CORE_RADIUS }]);

  // clamp so nothing (including its label) escapes the canvas
  const margin = 64;
  positioned.forEach((n) => {
    n.x = Math.min(WIDTH - margin, Math.max(margin, n.x));
    n.y = Math.min(HEIGHT - margin, Math.max(margin, n.y));
  });

  // label sits just outside each cluster's own radius, along the same
  // outward direction as the cluster itself (not always straight up),
  // so it never drifts back over a neighbouring cluster. Uses each
  // node's REAL post-collision position (not the idealized localRadius)
  // so a node that got pushed further out during collision resolution
  // never ends up sitting on top of the label.
  const groupLabels = {};
  nodesByGroup.forEach(({ group, nodes }) => {
    const gPos = groupPositions[group];
    const dx = gPos.x - CENTER.x;
    const dy = gPos.y - CENTER.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / dist;
    const uy = dy / dist;

    // how far each of this group's actual nodes extends along the
    // outward direction, including its own radius
    const groupNodes = positioned.filter((n) => n.group === group);
    const maxReach = Math.max(
      ...groupNodes.map(
        (n) => (n.x - gPos.x) * ux + (n.y - gPos.y) * uy + n.r
      )
    );

    const offset = maxReach + 42; // clearance for the label text itself
    const marginX = 90;
    const marginY = 26;
    groupLabels[group] = {
      x: Math.min(WIDTH - marginX, Math.max(marginX, gPos.x + ux * offset)),
      y: Math.min(HEIGHT - marginY, Math.max(marginY, gPos.y + uy * offset)),
    };
  });

  return { groupPositions, positioned, groupLabels };
}

export default function SkillConstellation() {
  const { groupPositions, positioned, groupLabels } = useMemo(buildLayout, []);
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
        <circle cx={CENTER.x} cy={CENTER.y} r={100} fill="url(#coreGlow)" opacity={0.5} />
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={54}
          fill="var(--color-surface-2)"
          stroke="var(--color-accent)"
          strokeWidth={2}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        />
        <text
          x={CENTER.x}
          y={CENTER.y + 7}
          textAnchor="middle"
          className="font-mono font-semibold"
          fontSize="18"
          fill="var(--color-ink)"
        >
          HS
        </text>

        {/* group labels */}
        {Object.entries(groupLabels).map(([group, pos]) => (
          <text
            key={`label-${group}`}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            className="font-mono uppercase font-semibold"
            fontSize="16"
            letterSpacing="2"
            fill={SKILL_GROUPS[group].color}
            opacity={0.9}
          >
            {SKILL_GROUPS[group].label}
          </text>
        ))}

        {/* skill nodes */}
        {positioned.map((node, i) => {
          const isHovered = hovered === node.id;
          const r = node.r;
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
                y={node.y + r + 20}
                textAnchor="middle"
                fontSize="14"
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
