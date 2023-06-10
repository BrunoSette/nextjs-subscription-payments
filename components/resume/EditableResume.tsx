import React, {
  PropsWithChildren,
  Ref,
  useCallback,
  useMemo,
} from 'react';
import {
  Editor,
  Element as SlateElement,
  createEditor,
  BaseEditor,
  Descendant,
  Node,
  Transforms
} from 'slate';
import { withHistory } from 'slate-history';
import {
  RenderElementProps,
  ReactEditor,
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  useSlate
} from 'slate-react';
import isHotkey from 'is-hotkey';
// import { useResume } from '@/contexts/ResumeContext';
import {
  ICertificationAndVolunteer,
  IPersonalInfo,
  IResumeEducation,
  IResumeWorkExperiences
} from '@/types';
import UndoChanges from '../UndoChanges';
import { useRouter } from 'next/router';
import Dropdown from '../ui/Dropdown/Dropdown';

const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];
const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
};

type ElementType =
  | 'block'
  | 'two-columns'
  | 'bulleted-list'
  | 'heading-one'
  | 'heading-two'
  | 'list-item'
  | 'numbered-list'
  | 'paragraph';

type CustomElement = {
  type: ElementType;
  children: CustomText[] | CustomElement[];
  align?: string;
};
type CustomText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
  code?: true;
};
type CustomEditor = BaseEditor & ReactEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

function parsePersonalInfo(personalInfo: IPersonalInfo): Descendant[] {
  if (!personalInfo.fName || !personalInfo.lName) return [];

  const slatePersonalInfo: Descendant[] = [
    {
      type: 'heading-one',
      children: [
        { text: `${personalInfo.fName} ${personalInfo.lName}`, bold: true }
      ] as CustomText[]
    },
    {
      type: 'paragraph',
      children: [
        {
          text: `${personalInfo.city}, ${personalInfo.region} - ${personalInfo.phone} - ${personalInfo.email}\n`
        },
        {
          text: personalInfo.linkedin
            ? `Linkedin: ${personalInfo.linkedin}\n`
            : ''
        },
        {
          text: personalInfo.portfolio
            ? `Portfolio: ${personalInfo.portfolio}`
            : ''
        }
      ] as CustomText[]
    }
  ];

  return slatePersonalInfo;
}

function parseProfile(profile: string[]): Descendant[] {
  if (!profile?.length) return [];

  const slateProfile: Descendant[] = [
    {
      type: 'heading-one',
      children: [{ text: 'Profile', bold: true }] as CustomText[]
    },
    {
      type: 'bulleted-list',
      children: profile.map((bullet_point: string) => ({
        type: 'list-item',
        align: 'justify',
        children: [{ text: bullet_point }] as CustomText[]
      })) as CustomElement[]
    }
  ];

  return slateProfile;
}

function parseWorkExperiences(
  experiences: IResumeWorkExperiences[]
): Descendant[] {
  if (!experiences?.length) return [];

  const slateWorkExperiences: Descendant[] = [
    {
      type: 'heading-one',
      children: [
        { text: 'Professional Experiences', bold: true }
      ] as CustomText[]
    },
    ...(experiences
      .filter((exp: IResumeWorkExperiences) => exp.company !== '')
      .map((exp: IResumeWorkExperiences) => {
        return {
          type: 'block',
          children: [
            {
              type: 'two-columns',
              children: [
                {
                  type: 'heading-two',
                  children: [{ text: exp.role, bold: true }] as CustomText[]
                },
                {
                  type: 'paragraph',
                  children: [
                    { text: `${exp.date_in} - ${exp.date_out}`, bold: true }
                  ] as CustomText[]
                }
              ] as CustomElement[]
            },
            {
              type: 'heading-two',
              children: [{ text: exp.company, bold: true }] as CustomText[]
            },
            {
              type: 'bulleted-list',
              children: exp.achievements.map((achievement: string) => ({
                type: 'list-item',
                align: 'justify',
                children: [{ text: achievement }] as CustomText[]
              })) as CustomElement[]
            }
          ] as CustomElement[]
        };
      }) as Descendant[])
  ];

  return slateWorkExperiences;
}

function parseEducation(education: IResumeEducation[]): Descendant[] {
  if (!education?.length) return [];

  const slateEducation: Descendant[] = [
    {
      type: 'heading-one',
      children: [{ text: 'Education', bold: true }] as CustomText[]
    },
    ...(education
      .filter((educ: IResumeEducation) => educ.course !== '')
      .map((educ: IResumeEducation) => {
        return {
          type: 'block',
          children: [
            {
              type: 'two-columns',
              children: [
                {
                  type: 'paragraph',
                  align: 'left',
                  children: [{ text: educ.course, bold: true }] as CustomText[]
                },
                {
                  type: 'paragraph',
                  align: 'right',
                  children: [{ text: `${educ.year}` }] as CustomText[]
                }
              ] as CustomElement[]
            },
            {
              type: 'two-columns',
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: educ.institution }] as CustomText[]
                },
                {
                  type: 'paragraph',
                  children: [{ text: educ.city }] as CustomText[]
                }
              ] as CustomElement[]
            }
          ] as CustomElement[]
        };
      }) as Descendant[])
  ];

  return slateEducation;
}

function parseCertificationAndVolunteer(
  items: ICertificationAndVolunteer[],
  title: string
): Descendant[] {
  if (!items?.length) return [];

  const slateCertificationsAndVolunteer = [
    {
      type: 'heading-one',
      children: [{ text: title, bold: true }] as CustomText[]
    },
    ...items
      .filter((item: ICertificationAndVolunteer) => item.name !== '')
      .map((item: ICertificationAndVolunteer) => {
        return {
          type: 'block',
          children: [
            {
              type: 'two-columns',
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: item.name }] as CustomText[]
                },
                {
                  type: 'paragraph',
                  children: [{ text: `${item.year}` }] as CustomText[]
                }
              ] as CustomElement[]
            },
            {
              type: 'paragraph',
              children: [{ text: item.issuer }] as CustomText[]
            }
          ] as CustomElement[]
        };
      })
  ] as Descendant[];

  return slateCertificationsAndVolunteer;
}

export default function EditableResume() {
  // const { resume, personalInfo } = useResume();
  // const router = useRouter();

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback((props: RenderElementProps) => {
    return <Element {...props} />;
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  // const {
  //   firstStep: { profile },
  //   secondStep: { experiences },
  //   thirdStep: { education },
  //   fourthStep: {
  //     additional_information: { certifications, volunteer }
  //   }
  // } = resume;

  // const slatePersonalInfo: Descendant[] = useMemo(
  //   () => parsePersonalInfo(personalInfo),
  //   [personalInfo]
  // );
  // const slateProfile: Descendant[] = useMemo(
  //   () => parseProfile(profile),
  //   [profile]
  // );
  // const slateWorkExperiences: Descendant[] = useMemo(
  //   () => parseWorkExperiences(experiences),
  //   [experiences]
  // );
  // const slateVolunteer: Descendant[] = useMemo(
  //   () => parseCertificationAndVolunteer(volunteer, 'Volunteer'),
  //   [volunteer]
  // );
  // const slateEducation: Descendant[] = useMemo(
  //   () => parseEducation(education),
  //   [education]
  // );
  // const slateCertifications: Descendant[] = useMemo(
  //   () => parseCertificationAndVolunteer(certifications, 'Certifications'),
  //   [certifications]
  // );

  // const slateResume: Descendant[] = useMemo(
  //   () => [
  //     ...slatePersonalInfo,
  //     ...slateProfile,
  //     ...slateWorkExperiences,
  //     ...slateVolunteer,
  //     ...slateEducation,
  //     ...slateCertifications
  //   ],
  //   [
  //     slatePersonalInfo,
  //     slateProfile,
  //     slateWorkExperiences,
  //     slateVolunteer,
  //     slateEducation,
  //     slateCertifications
  //   ]
  // );

  // const editableResume = useMemo(
  //   () =>
  //     JSON.parse(
  //       localStorage.getItem('editable') || JSON.stringify(slateResume)
  //     ),
  //   [slateResume]
  // );

  // TODO: improve typing here
  const handleChange = (value: any): void => {
    const isAstChange = editor.operations.some(
      (op) => 'set_selection' !== op.type
    );
    if (isAstChange) {
      // Save the value to Local Storage.
      const content = JSON.stringify(value);
      localStorage.setItem('editable', content);
    }
  };

  // TODO: improve typing here
  const handleKeyDown = (event: any): void => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
        toggleMark(editor, mark);
      }
    }
  };

  // const handleUndo = (): void => {
  //   localStorage.setItem('editable', JSON.stringify(slateResume));
  //   // setEditableResume(slateResume);
  //   router.reload();
  // };

  const resumeHTMLWord = `<html xmlns: o='urn:schemas-microsoft-om:office:office'
        xmlns:w='urn:schemas-microsoft-com:office:word'
        xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'>
        <link type=\"text/css\" href=\"https://cdn.quilljs.com/1.3.6/quill.snow.css\" rel=\"stylesheet\">
        </head><body>
        ${document.getElementById('section-to-print')?.innerHTML}
        </body></html>`;

  const resumeHTMLDrive = document.getElementById('section-to-print')?.innerHTML || "";

  return (
    <div className="max-w-3xl">
      <Slate
        editor={editor}
        // initialValue={editableResume}
        onChange={handleChange}
      >
        <div>
          <Toolbar className="sticky top-16 md:top-20 p-2 bg-white shadow-md z-10">
            <MarkButton format="bold" icon="format_bold" />
            <MarkButton format="italic" icon="format_italic" />
            <MarkButton format="underline" icon="format_underlined" />
            <BlockButton format="heading-one" icon="looks_one" />
            <BlockButton format="heading-two" icon="looks_two" />
            <BlockButton format="numbered-list" icon="format_list_numbered" />
            <BlockButton format="bulleted-list" icon="format_list_bulleted" />
            <BlockButton format="left" icon="format_align_left" />
            <BlockButton format="center" icon="format_align_center" />
            <BlockButton format="right" icon="format_align_right" />
            <BlockButton format="justify" icon="format_align_justify" />
          </Toolbar>
          <div
            id="section-to-print"
            className="shadow-[0_0px_30px_-8px_rgba(0,0,0,0.3)]"
          >
            <Editable
              className="px-6 py-3 my-6 font-calibre"
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Enter some rich text…"
              spellCheck
              autoFocus
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </Slate>

      <div className="flex gap-x-2">
        {/* <UndoChanges onClick={handleUndo} /> */}
        {/* <Dropdown
          // slateResume={slateResume}
          resumeHTMLWord={resumeHTMLWord}
          resumeHTMLDrive={resumeHTMLDrive}
        /> */}
      </div>
    </div>
  );
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  // TODO: improve the typing here.
  const style: any = { textAlign: element?.align || 'left' };
  switch (element.type) {
    case 'block':
      return (
        <div {...attributes} className="mb-4" style={style}>
          {children}
        </div>
      );
    case 'two-columns':
      return (
        <div {...attributes} className="flex justify-between" style={style}>
          {children}
        </div>
      );
    case 'bulleted-list':
      return (
        <ul
          {...attributes}
          className="list-disc list-inside text-xs P-2 space-y-1 printable"
          style={style}
        >
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1
          {...attributes}
          className="text-lg py-1 font-bold text-black-500"
          style={style}
        >
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 {...attributes} className="text-sm font-bold" style={style}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li {...attributes} className="text-grey-300 printable" style={style}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol
          {...attributes}
          className="list-disc list-inside text-xs P-2 space-y-1 printable"
          style={style}
        >
          {children}
        </ol>
      );
    default:
      return (
        <p {...attributes} className="text-xs" style={style}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const isBlockActive = (
  editor: CustomEditor,
  format: string,
  blockType: string = 'type'
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n: Node): boolean =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType as keyof SlateElement] === format
    })
  );

  return !!match;
};

const toggleBlock = (editor: CustomEditor, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format
    };
  } else {
    newProperties = {
      type: isActive
        ? 'paragraph'
        : isList
          ? 'list-item'
          : (format as SlateElement['type'])
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block: Partial<SlateElement> = {
      type: format as SlateElement['type'],
      children: []
    };
    Transforms.wrapNodes(editor, block as SlateElement);
  }
};

const isMarkActive = (editor: CustomEditor, format: string): boolean => {
  const marks = Editor.marks(editor);
  return marks
    ? marks[format as keyof Omit<CustomText, 'text'>] === true
    : false;
};

const toggleMark = (editor: CustomEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

interface ButtonProps {
  format: string;
  icon: string;
}

const BlockButton = ({ format, icon }: ButtonProps) => {
  const editor = useSlate();
  const active = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  );

  return (
    <Button
      className="mx-2"
      // TODO: improve typing here.
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon
        className={
          active
            ? 'material-icons text-black-400'
            : 'material-icons text-gray-400'
        }
      >
        {icon}
      </Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }: ButtonProps) => {
  const editor = useSlate();
  const active = isMarkActive(editor, format);

  return (
    <Button
      className="mx-2"
      // TODO: improve typing here.
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon
        className={
          active
            ? 'material-icons text-black-400'
            : 'material-icons text-gray-400'
        }
      >
        {icon}
      </Icon>
    </Button>
  );
};

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | undefined;

// TODO: improve typing here.
const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>> | any
  ) => <div {...props} data-test-id="menu" ref={ref} className={className} />
);
Menu.displayName = 'Menu';

const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => <Menu {...props} ref={ref} className={className} />
);
Toolbar.displayName = 'Toolbar';

// TODO: improve typing here.
export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<{ active: boolean; reversed: boolean } & BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>> | any
  ) => <span {...props} ref={ref} className={className} />
);
Button.displayName = 'Button';

// TODO: improve typing here.
export const Icon = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>> | any
  ) => <span {...props} ref={ref} className={className} />
);
Icon.displayName = 'Icon';
