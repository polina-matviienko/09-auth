"use client";

import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username") as string;
    try {
      const updatedUser = await updateMe({ username });
      setUser(updatedUser);
      router.push("/profile");
    } catch {
      alert("Failed to update profile. Please try again.");
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        {user && (
          <>
            <h1 className={css.formTitle}>Edit Profile</h1>

            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />

            <form className={css.profileInfo} action={handleSubmit}>
              <div className={css.usernameWrapper}>
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className={css.input}
                  defaultValue={user.username}
                />
              </div>

              <p>Email: {user.email}</p>

              <div className={css.actions}>
                <button type="submit" className={css.saveButton}>
                  Save
                </button>
                <button
                  onClick={() => router.back()}
                  type="button"
                  className={css.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
