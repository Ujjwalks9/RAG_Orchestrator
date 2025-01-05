// import React from "react";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// function Draggable({ id, children }) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     padding: "10px",
//     margin: "10px 0",
//     border: "1px solid #ccc",
//     backgroundColor: "#f9f9f9",
//     borderRadius: "5px",
//     cursor: "grab",
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {children}
//     </div>
//   );
// }

// export default Draggable;
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default Draggable;
