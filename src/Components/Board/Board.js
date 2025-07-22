import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "react-feather";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";

import "./Board.css";

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title" title={props.board?.title}>
          {props.board?.title}
          <span className="card_count">({props.board?.cards?.length || 0})</span>
        </p>

        <div
          className="board_header_title_more"
          onClick={() => setShowDropdown(!showDropdown)}
          ref={dropdownRef}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown class="board_dropdown" onClose={() => setShowDropdown(false)}>
              <p onClick={() => props.removeBoard()}>🗑 𝐃𝐞𝐥𝐞𝐭𝐞 𝐁𝐨𝐚𝐫𝐝</p>
            </Dropdown>
          )}
        </div>
      </div>

      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}

        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;
