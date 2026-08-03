describe("routes  : ", () => {
    test("Home page renders successfully", async () => {
        jest.resetModules();
        const { default: home } = await import("../src/routes/home");

        const html = home();
        expect(html).toContain('role="main"');
    });
    test("Login page renders successfully", async () => {
        jest.resetModules();
        const { default: Login } = await import("../src/routes/login");
        const html = Login();
        expect(html).toContain("Login");
    });
    test("Sign up page renders successfully", async () => {
        jest.resetModules();
        const { default: signup } = await import("../src/routes/signUp");
        const html = signup();
        expect(html).toContain("SignUp");
    });
});
