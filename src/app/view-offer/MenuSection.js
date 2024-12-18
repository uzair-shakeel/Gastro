import { useState } from "react";
import { Collapse, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

export default function MenuSection({
  title,
  price,
  children,
  expanded: initialExpanded,
}) {
  const [expanded, setExpanded] = useState(initialExpanded);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center bg-gray-100 p-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center">
          <span className="mr-2">{price}</span>
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>
      </div>
      <Collapse in={expanded}>
        <div className="border border-gray-200 p-2">{children}</div>
      </Collapse>
    </div>
  );
}
