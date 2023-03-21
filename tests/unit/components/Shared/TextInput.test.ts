import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import TextInput from "@/components/Shared/TextInput.vue";

describe("TextInput", () => {
  it("Communicates that user has entered characters", async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: "",
      },
    });
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "SBY");
    const messages = emitted()["update:modelValue"];
    expect(messages).toEqual([["S"], ["SB"], ["SBY"]]);
  });
});
