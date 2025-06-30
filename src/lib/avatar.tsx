import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";

interface Props {
    seed: string;
    variants: "botttsNeutral" | "initials";
}

export const generateAvatarUri = ({
    seed,
    variants,
}: Props) => {
    let avatar;
    if(variants === "botttsNeutral"){
        avatar = createAvatar(botttsNeutral, {seed});
    }else {
        avatar = createAvatar(initials, {seed, fontWeight: 500, fontSize: 42});
    }

    return avatar.toDataUri();
}