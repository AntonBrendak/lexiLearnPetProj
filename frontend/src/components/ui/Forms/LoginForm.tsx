import React from "react";
import { LoginBackground } from "../Backgrounds/LoginBackground";
import { BaseForm } from "./BaseForm";

export const LoginForm = ({ children, ...props }) => (
  <>
    <LoginBackground />        {/* фон і хвилі */}
    <BaseForm {...props}>{children}</BaseForm> {/* форма поверх */}
  </>
);