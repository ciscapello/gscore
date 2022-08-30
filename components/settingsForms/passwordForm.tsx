import { Form } from "./infoForm";
import { ChangedButton, InfoInput, Subtitle } from "./infoForm";

export default function PasswordForm() {
  return (
    <Form>
      <Subtitle>Change Password</Subtitle>
      <InfoInput placeholder="Current Password" />
      <InfoInput placeholder="New Password" />
      <ChangedButton>Save</ChangedButton>
    </Form>
  );
}
