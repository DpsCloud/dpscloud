"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const supabase = await createClient();

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email e senha são obrigatórios",
    );
  }

  try {
    // Create user in auth
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          email: email,
        },
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        return encodedRedirect(
          "error",
          "/sign-up",
          "Este email já está cadastrado. Por favor, faça login ou use outro email.",
        );
      }
      return encodedRedirect("error", "/sign-up", error.message);
    }

    if (!user) {
      return encodedRedirect(
        "error",
        "/sign-up",
        "Erro ao criar usuário. Por favor, tente novamente.",
      );
    }

    // Insert user into users table
    const { error: insertError } = await supabase.from("users").upsert(
      {
        id: user.id,
        user_id: user.id,
        name: fullName,
        email: email,
        token_identifier: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );

    if (insertError) {
      return encodedRedirect(
        "error",
        "/sign-up",
        "Erro ao atualizar usuário. Por favor, tente novamente.",
      );
    }

    return encodedRedirect(
      "success",
      "/sign-in",
      "Cadastro realizado com sucesso! Você já pode fazer login.",
    );
  } catch (err) {
    console.error("Erro no cadastro:", err);
    return encodedRedirect(
      "error",
      "/sign-up",
      "Erro ao processar o cadastro. Por favor, tente novamente.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  try {
    // Verificar se é o usuário admin
    if (email === "admin" && password === "admin") {
      // Tentar fazer login direto com as credenciais do admin
      const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
        email: "admin@dpscloud.com",
        password: "admin123!@#",
      });

      // Se não conseguir fazer login, criar o usuário
      if (loginError) {
        // Criar o usuário admin
        const { data: { user: newUser }, error: signUpError } = await supabase.auth.signUp({
          email: "admin@dpscloud.com",
          password: "admin123!@#",
        });

        if (signUpError || !newUser) {
          console.error("Erro ao criar admin:", signUpError);
          return encodedRedirect("error", "/sign-in", "Erro ao criar usuário admin");
        }

        // Criar o perfil do admin
        const { error: insertError } = await supabase.from("users").insert({
          id: newUser.id,
          user_id: newUser.id,
          name: "Administrador",
          email: "admin@dpscloud.com",
          token_identifier: newUser.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (insertError) {
          console.error("Erro ao criar perfil admin:", insertError);
          return encodedRedirect("error", "/sign-in", "Erro ao criar perfil do admin");
        }

        // Login automático após criar a conta
        return redirect("/dashboard");
      }

      // Se o login foi bem sucedido
      if (user) {
        return redirect("/dashboard");
      }
    }

    // Login normal para outros usuários
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return encodedRedirect("error", "/sign-in", "Email ou senha incorretos");
    }

    if (user) {
      return redirect("/dashboard");
    }

    return encodedRedirect("error", "/sign-in", "Erro ao fazer login");
  } catch (err) {
    console.error("Erro no login:", err);
    return encodedRedirect("error", "/sign-in", "Erro ao fazer login. Tente novamente.");
  }
};

export const signInWithGoogleAction = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "Erro ao fazer login com Google",
    );
  }

  if (data?.url) {
    return redirect(data.url);
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email é obrigatório");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {});

  if (error) {
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Não foi possível redefinir a senha",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Verifique seu email para o link de redefinição de senha.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Senha e confirmação de senha são obrigatórias",
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "As senhas não coincidem",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Falha na atualização da senha",
    );
  }

  return encodedRedirect("success", "/protected/reset-password", "Senha atualizada");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const checkUserSubscription = async (userId: string) => {
  const supabase = await createClient();

  try {
    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .single();

    if (error) {
      console.error("Erro ao verificar assinatura:", error);
      return false;
    }

    return !!subscription;
  } catch (err) {
    console.error("Erro ao verificar assinatura:", err);
    return false;
  }
};
