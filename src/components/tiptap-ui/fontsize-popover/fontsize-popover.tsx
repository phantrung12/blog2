import { forwardRef, useCallback, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/tiptap-ui-primitive/popover";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { CaseSensitive, RemoveFormatting } from "lucide-react";
import {
  Card,
  CardBody,
  CardItemGroup,
} from "@/components/tiptap-ui-primitive/card";
import { Input } from "@/components/tiptap-ui-primitive/input";
import { ButtonGroup } from "@/components/tiptap-ui-primitive/button-group";

export const FontSizePopover = forwardRef<HTMLButtonElement>(({}, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsOpen((prev) => !prev);
    },
    [],
  );

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          role="button"
          tabIndex={-1}
          onClick={handleClick}
          aria-label="Font Size"
          tooltip="Font Size"
          ref={ref}
        >
          <CaseSensitive className="tiptap-button-icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Card>
          <CardBody>
            <CardItemGroup orientation="horizontal">
              <Input
                type="number"
                placeholder="Font Size"
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                className="tiptap-link-input w-20"
              />

              <ButtonGroup>
                <Button type="button" title="Apply link" variant="ghost">
                  <RemoveFormatting className="tiptap-button-icon" />
                </Button>
              </ButtonGroup>
            </CardItemGroup>
          </CardBody>
        </Card>
      </PopoverContent>
    </Popover>
  );
});
