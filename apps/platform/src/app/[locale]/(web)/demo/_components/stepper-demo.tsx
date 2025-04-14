"use client";
import { z } from "@oe/api";
import {
  FormNestedWrapper,
  type INestedFormsValues,
  StepperForm,
} from "@oe/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@oe/ui";
import { FormFieldWithLabel } from "@oe/ui";
import { Input } from "@oe/ui";

// Định nghĩa schemas
const personalSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z.string().regex(/^\d{10}$/, "Số điện thoại không hợp lệ"),
});

const accountSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

// Components cho từng step
function PersonalInfoForm() {
  return (
    <>
      <FormFieldWithLabel name="name" label="Họ tên">
        <Input />
      </FormFieldWithLabel>
      <FormFieldWithLabel name="phone" label="Số điện thoại">
        <Input />
      </FormFieldWithLabel>
    </>
  );
}

function AccountForm() {
  console.log("AccountForm");
  return (
    <>
      <FormFieldWithLabel name="email" label="Email">
        <Input />
      </FormFieldWithLabel>
      <FormFieldWithLabel name="password" label="Mật khẩu">
        <Input />
      </FormFieldWithLabel>
    </>
  );
}

function ReviewForm() {
  console.log("ReviewForm");
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Vui lòng kiểm tra lại thông tin trước khi hoàn tất đăng ký
      </p>
      {/* Có thể hiển thị summary của các form trước */}
    </div>
  );
}

// Component chính
export function Registration() {
  const handleSubmit = async (values: INestedFormsValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form values:", values);
    // Xử lý submit form
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Đăng ký tài khoản</CardTitle>
        </CardHeader>

        <CardContent>
          <StepperForm
            steps={[
              { id: "personal", title: "Thông tin cá nhân" },
              { id: "account", title: "Tài khoản" },
              { id: "review", title: "Xác nhận" },
            ]}
            requireComplete={true}
            onSubmit={handleSubmit}
          >
            {(stepper) => (
              <>
                {stepper.switch({
                  personal: () => (
                    <FormNestedWrapper
                      id="personal-form"
                      tabId="personal"
                      schema={personalSchema}
                    >
                      <PersonalInfoForm />
                    </FormNestedWrapper>
                  ),
                  account: () => (
                    <FormNestedWrapper
                      id="account-form"
                      tabId="account"
                      schema={accountSchema}
                    >
                      <AccountForm />
                    </FormNestedWrapper>
                  ),
                  review: () => (
                    <FormNestedWrapper id="review-form" tabId="review">
                      <ReviewForm />
                    </FormNestedWrapper>
                  ),
                })}
              </>
            )}
          </StepperForm>
        </CardContent>
      </Card>
    </div>
  );
}
