import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { updateUser } from "@/services/userService";
import { User } from "@/types";
import { useState } from "react";

interface EditUserSheetProps {
    userToEdit: User | null;
    setUserToEdit: React.Dispatch<React.SetStateAction<User | null>>;
    handleUpdateUser: (updatedUser: User) => void;
}

export function EditUserSheet({ userToEdit, setUserToEdit, handleUpdateUser }: EditUserSheetProps) {
    if (!userToEdit) return null;

    const [editedUser, setEditedUser] = useState<User>(userToEdit);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
        setEditedUser((prevUser) => ({ ...prevUser, [field]: e.target.value }));
    };

    // Save the changes and update the parent state
    const handleSaveChanges = async () => {
        try {
            // Call API to update user
            const updatedUser = await updateUser(editedUser.id, editedUser.name, editedUser.email);
            // After successfully updating the backend, update the frontend state
            handleUpdateUser(updatedUser);
            setUserToEdit(null); // Close the sheet
        } catch (err) {
            console.log("Failed to update user", err);
        }
    };

    return (
        <Sheet open={!!userToEdit} onOpenChange={(open) => !open && setUserToEdit(null)}>
            <SheetContent className="bg-white">
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value={editedUser.name} onChange={(e) => handleInputChange(e, "name")} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input id="email" value={editedUser.email} onChange={(e) => handleInputChange(e, "email")} className="col-span-3" />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline" onClick={() => setUserToEdit(null)}>
                            Cancel
                        </Button>
                    </SheetClose>
                    <Button variant="outline" onClick={handleSaveChanges}>
                        Save changes
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
