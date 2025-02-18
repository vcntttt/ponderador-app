import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DropdownMenu from "zeego/dropdown-menu";

export function MyMenu() {
  return (
    <DropdownMenu.Root>
      {/* Trigger: el botón (o ícono) que abre el menú */}
      <DropdownMenu.Trigger asChild>
        <TouchableOpacity style={{ marginRight: 12 }}>
          <Ionicons name="ellipsis-horizontal" size={24} />
        </TouchableOpacity>
      </DropdownMenu.Trigger>

      {/* Contenido del menú */}
      <DropdownMenu.Content side="bottom" align="end">
        {/* 
          <DropdownMenu.Label> 
          - Renders a label. En iOS/Android aparece arriba. 
          - No necesita 'key' ni 'textValue'. 
          - Children debe ser un string. 
        */}
        <DropdownMenu.Label
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          My Label
        </DropdownMenu.Label>

        {/* 
          Cada <DropdownMenu.Item>:
          - Debe tener 'key' único y 'textValue' (usado como título interno en iOS/Android y para typeahead en web).
          - El texto visible se pone dentro de <DropdownMenu.ItemTitle> como children. 
        */}
        <DropdownMenu.Item key="item-1" textValue="Item 1">
          <DropdownMenu.ItemTitle>Item 1</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>

        {/* Separador visual (solo web) */}
        <DropdownMenu.Separator />

        {/* Flecha (solo web) */}
        <DropdownMenu.Arrow width={10} height={5} fill="#ccc" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default MyMenu;
