import React from "react";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../app";
import { render } from "../tests/custom-render";
import { requestLogin, requestSignup } from "../services/api/user";
import { successLoginRes } from "../tests/fixtures/success-login-res";
import { userLoggedIn } from "../tests/fixtures/auth-state";

afterEach(cleanup);

const emailExample = "user@email.com";
const passwordExample = "userPasswordExample1";
const fullNameExample = "fullnameExample";

jest
  .mock("../services/api/user")
  .mock("../services/api/board")
  .mock("fit-textarea");
test("should render login page", () => {
  requestLogin.mockImplementation(() => Promise.resolve(successLoginRes));
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>
  );

  // logo is rendered
  screen.getByText("Mello");
  // login instruction is rendered
  screen.getByText("Log in to Mello");
  // link to signup page
  screen.getByText("Sign up for an account");
  // email input is rendered
  const emailInputEl = screen.getByPlaceholderText("Enter email");
  fireEvent.change(emailInputEl, { target: { value: emailExample } });
  // test user input
  screen.getByDisplayValue(emailExample);
  // password input is rendered
  const passwordInputEl = screen.getByPlaceholderText("Enter password");
  fireEvent.change(passwordInputEl, { target: { value: passwordExample } });
  // submit button is rendered
  const submitBtn = screen.getByText("Log in");
  fireEvent.click(submitBtn);
  expect(requestLogin).toHaveBeenCalledTimes(1);
});

test("should render sign up page", () => {
  requestSignup.mockResolvedValue({
    data: successLoginRes,
  });

  render(
    <MemoryRouter initialEntries={["/register"]}>
      <App />
    </MemoryRouter>
  );
  // logo is rendered
  screen.getByText("Mello");
  // login instruction is rendered
  screen.getByText("Sign up for your account");
  // link to login page
  screen.getByText("Already have an account? Log in");

  // full name input is rendered
  const fullnameInputEl = screen.getByPlaceholderText("Enter full name");
  fireEvent.change(fullnameInputEl, { target: { value: fullNameExample } });
  // test user input
  screen.getByDisplayValue(fullNameExample);
  // email input is rendered
  const emailInputEl = screen.getByPlaceholderText("Enter email address");
  fireEvent.change(emailInputEl, { target: { value: emailExample } });
  // test user input
  screen.getByDisplayValue(emailExample);
  // password input is rendered
  const passwordInputEl = screen.getByPlaceholderText("Create password");
  fireEvent.change(passwordInputEl, { target: { value: passwordExample } });
  // test user input
  screen.getByDisplayValue(passwordExample);
  // submit button is rendered
  const submitButton = screen.getByText("Sign up");
  fireEvent.click(submitButton);
  expect(requestSignup).toHaveBeenCalledTimes(1);
});

test("login page should redirect to home page when user is logged in", () => {
  const { debug } = render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>,
    {
      initialState: {
        auth: userLoggedIn,
      },
    }
  );
  // should not render signup page
  expect(screen.queryByText("Log in to Mello")).toBeFalsy();
});

test("signup page should redirect to home page when user is logged in", () => {
  render(
    <MemoryRouter initialEntries={["/register"]}>
      <App />
    </MemoryRouter>,
    {
      initialState: {
        auth: userLoggedIn,
      },
    }
  );
  // should not render signup page
  expect(screen.queryByText("Sign up for your account")).toBeFalsy();
});

test("login page should render error messages", () => {
  const loginErrorMessage = "example login message";
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>,
    {
      initialState: {
        errors: {
          login: loginErrorMessage,
        },
      },
    }
  );
  screen.getByText(loginErrorMessage);
});
test("signup page should render error messages", () => {
  const signupErrorMessage = "example ssignup message";
  render(
    <MemoryRouter initialEntries={["/register"]}>
      <App />
    </MemoryRouter>,
    {
      initialState: {
        errors: {
          signup: signupErrorMessage,
        },
      },
    }
  );
  screen.getByText(signupErrorMessage);
});
