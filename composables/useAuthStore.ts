export default function useAuthStore() {
    const loggedUser = useState("loggedUser", () => null as Omit<IUser, "password"> | null);
    const token = useCookie("token");

    async function register(body: IRegister.Body) {
        const res = await executeRequest<IRegister.Data>("/auth/register", { method: "POST", body });
        return res;
    }

    async function activate(body: IActivate.Body) {
        const res = await executeRequest("/auth/activate", { method: "POST", body });
        return res;
    }

    async function getMe() {
        const res = await executeRequest<ILogin.Data>("/auth/myself", { method: "GET" });
        if (res.status && res.data) {
            loggedUser.value = res.data.data;
        }
        return res;
    }

    async function login(body: ILogin.Body) {
        const res = await executeRequest<ILogin.Data>("/auth/login", { method: "POST", body });
        if (res.status && res.data) {
            loggedUser.value = res.data.data;
            token.value = res.data.data.token;
        }
        return res;
    }

    return { loggedUser, register, getMe, activate, login };
}
