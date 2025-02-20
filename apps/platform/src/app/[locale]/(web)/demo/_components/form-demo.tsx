// schemas.ts
"use client";
import { fileResponseSchema } from "@oe/api/types/file";
// import { personalSchema, accountSchema, addressSchema, preferencesSchema } from './schemas';
// import { toast } from '@oe/ui/shadcn/use-toast';
import { z } from "@oe/api/utils/zod";
import {
  FormNestedProvider,
  FormNestedWrapper,
  FormTabs,
  FormTabsContent,
  FormTabsList,
  FormTabsTrigger,
  FormWrapper,
  type INestedFormsValues,
  SubmitFormsButton,
} from "@oe/ui/components/form-wrapper";
import { Selectbox } from "@oe/ui/components/selectbox";
import { Uploader } from "@oe/ui/components/uploader";
import { Button } from "@oe/ui/shadcn/button";
import { Checkbox } from "@oe/ui/shadcn/checkbox";
import { FormFieldWithLabel } from "@oe/ui/shadcn/form";
import { Input } from "@oe/ui/shadcn/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { create } from "./action";

export const personalSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dob: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  files: z.array(fileResponseSchema).min(1, "Please upload at least one file"),
});

export const accountSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const addressSchema = z.object({
  street: z.string().min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
});

export const preferencesSchema = z.object({
  notifications: z.boolean(),
  newsletter: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
  language: z.string().min(1, "Please select a language"),
});

// registration-form.tsx

export function RegistrationForm() {
  const handleSubmit = async (values: INestedFormsValues) => {
    try {
      // Submit to your API here
      const res = await create();
      console.info("Final form values:", values, res);
      toast.success("Registration successful!");
    } catch {
      toast.error("Registration failed");
    }
  };

  const [user, setUser] = useState<Partial<z.infer<typeof personalSchema>>>();

  useEffect(() => {
    setTimeout(
      () =>
        setUser({
          firstName: "Frank",
          lastName: "Murphy",
          dob: "1980-01-01",
          phone: "1234567890",
        }),
      5000
    );
  }, []);

  return (
    <>
      <FormWrapper
        id="personal-form"
        schema={personalSchema}
        useFormProps={{ defaultValues: user }}
        onSubmit={handleSubmit}
      >
        {({ loading }) => (
          <div>
            <FormFieldWithLabel
              label="First Name"
              name="firstName"
              infoText="aaaa"
            >
              <Input />
            </FormFieldWithLabel>
            <FormFieldWithLabel label="Last Name" name="lastName">
              <Input />
            </FormFieldWithLabel>
            <FormFieldWithLabel label="Date of Birth" name="dob">
              <Input type="date" />
            </FormFieldWithLabel>
            <FormFieldWithLabel label="Phone" name="phone">
              <Input type="tel" />
            </FormFieldWithLabel>
            <FormFieldWithLabel label="Files" name="files">
              <Uploader
                multiple
                listType="picture"
                triggerProps={{ className: "order-1 h-24 w-24" }}
                className="p-0"
              >
                <Button variant="outline" className="h-full w-full">
                  Upload
                </Button>
              </Uploader>
            </FormFieldWithLabel>
            <Button type="submit" loading={loading}>
              Submit
            </Button>
          </div>
        )}
      </FormWrapper>

      <FormNestedProvider
        onSubmit={handleSubmit}
        defaultTab="personal"
        className="mx-auto w-full max-w-3xl p-6"
      >
        <FormTabs
          defaultValue="personal"
          className="w-full"
          showProgress
          showValidationSummary
        >
          <FormTabsList className="grid w-full grid-cols-4">
            <FormTabsTrigger tabId="personal" showIcon>
              Personal
            </FormTabsTrigger>
            <FormTabsTrigger tabId="account" showIcon>
              Account
            </FormTabsTrigger>
            <FormTabsTrigger tabId="address" showIcon>
              Address
            </FormTabsTrigger>
            <FormTabsTrigger tabId="preferences" showIcon>
              Preferences
            </FormTabsTrigger>
          </FormTabsList>

          {/* Personal Information Tab */}
          <FormTabsContent value="personal" showProgress showValidationSummary>
            <FormNestedWrapper
              id="personal-form"
              tabId="personal"
              schema={personalSchema}
              onError={() => {
                toast.error("Validation Error", {
                  description: "Please check your personal information.",
                });
              }}
            >
              {({ loading }) => (
                <div className="grid grid-cols-2 gap-4">
                  <FormFieldWithLabel label="First Name" name="firstName">
                    <Input disabled={loading} />
                  </FormFieldWithLabel>
                  <FormFieldWithLabel label="Last Name" name="lastName">
                    <Input disabled={loading} />
                  </FormFieldWithLabel>
                  <FormFieldWithLabel label="Date of Birth" name="dob">
                    <Input type="date" disabled={loading} />
                  </FormFieldWithLabel>
                  <FormFieldWithLabel label="Phone" name="phone">
                    <Input type="tel" disabled={loading} />
                  </FormFieldWithLabel>
                </div>
              )}
            </FormNestedWrapper>
          </FormTabsContent>

          {/* Account Tab */}
          <FormTabsContent value="account" showProgress showValidationSummary>
            <FormNestedWrapper
              id="account-form"
              tabId="account"
              schema={accountSchema}
              // dependencies={['personal-form']}
            >
              {({ loading }) => (
                <div className="space-y-4">
                  <FormFieldWithLabel label="Email" name="email">
                    <Input disabled={loading} />
                  </FormFieldWithLabel>
                  <FormFieldWithLabel label="Password" name="password">
                    <Input disabled={loading} />
                  </FormFieldWithLabel>
                  <FormFieldWithLabel
                    label="Confirm Password"
                    name="confirmPassword"
                  >
                    <Input disabled={loading} />
                  </FormFieldWithLabel>
                </div>
              )}
            </FormNestedWrapper>
          </FormTabsContent>

          {/* Address Tab */}
          <FormTabsContent value="address" showProgress showValidationSummary>
            <FormNestedWrapper
              id="address-form"
              tabId="address"
              schema={addressSchema}
              // dependencies={['account-form']}
              onError={() => {
                toast.error("Validation Error", {
                  description: "Please check your address information.",
                });
              }}
            >
              {({ loading }) => (
                <div className="space-y-4">
                  <FormFieldWithLabel label="Street Address" name="street">
                    <Input disabled={loading} />
                  </FormFieldWithLabel>
                  <FormFieldWithLabel label="City" name="city">
                    <Input disabled={loading} />
                  </FormFieldWithLabel>
                  <FormFieldWithLabel label="State" name="state">
                    <Input disabled={loading} />
                  </FormFieldWithLabel>
                  <FormFieldWithLabel label="ZIP Code" name="zipCode">
                    <Input disabled={loading} />
                  </FormFieldWithLabel>
                </div>
              )}
            </FormNestedWrapper>
          </FormTabsContent>

          {/* Preferences Tab */}
          <FormTabsContent
            value="preferences"
            showProgress
            showValidationSummary
          >
            <FormNestedWrapper
              id="preferences-form"
              tabId="preferences"
              schema={preferencesSchema}
              // dependencies={['address-form']}
            >
              {({ loading }) => (
                <div className="space-y-6">
                  <FormFieldWithLabel
                    label="Notifications"
                    name="notifications"
                  >
                    <Checkbox disabled={loading} />
                  </FormFieldWithLabel>
                  <FormFieldWithLabel label="Newsletter" name="newsletter">
                    <Checkbox disabled={loading} />
                  </FormFieldWithLabel>
                  <FormFieldWithLabel label="Theme Preference" name="theme">
                    <Selectbox
                      disabled={loading}
                      options={[
                        { id: "light", value: "light", label: "Light" },
                        { id: "dark", value: "dark", label: "Dark" },
                        { id: "system", value: "system", label: "System" },
                      ]}
                    />
                  </FormFieldWithLabel>
                  <FormFieldWithLabel label="Language" name="language">
                    <Selectbox
                      disabled={loading}
                      options={[
                        { id: "en", value: "en", label: "English" },
                        { id: "fr", value: "fr", label: "French" },
                        { id: "de", value: "de", label: "German" },
                      ]}
                    />
                  </FormFieldWithLabel>
                </div>
              )}
            </FormNestedWrapper>
          </FormTabsContent>
        </FormTabs>

        <div className="mt-6 flex gap-4">
          <SubmitFormsButton />
        </div>
      </FormNestedProvider>
    </>
  );
}
