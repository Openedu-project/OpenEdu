export const courseMessages = {
  course: {
    common: {
      coursesTitle: 'Courses',
      courseTitle: 'Course',
      noName: '[No name]',
      copy: 'Copy',

      actions: {
        save: 'Save',
        create: 'Create',
        cancel: 'Cancel',
        delete: 'Delete',
        continue: 'Continue',
        back: 'Back',
        duplicate: 'Duplicate',
        edit: 'Edit',
        move: 'Move',
        preview: 'Preview',
        publish: 'Publish',
        unpublish: 'Unpublish',
        addNew: 'Add new {item}',
        closeDrawer: 'Close {item} Drawer',
        sendRequest: 'Send Request',
        backToCourseList: 'Back to Course List',
      },

      toast: {
        createSuccess: '{item} created successfully',
        createError: 'Failed to create {item}',
        updateSuccess: '{item} updated successfully',
        updateError: 'Failed to update {item}',
        deleteSuccess: '{item} deleted successfully',
        deleteError: 'Failed to delete {item}',
        duplicateSuccess: '{item} duplicated successfully',
        duplicateError: 'Failed to duplicate {item}',
        sortSuccess: '{items} reordered successfully',
        sortError: 'Failed to reorder {items}',
        publishSuccess: '{item} published successfully',
        publishError: 'Failed to publish {item}',
        statusUpdateSuccess: 'Status updated successfully',
        statusUpdateError: 'Error updating status',
        requestPublishSuccess: 'Request for approval sent successfully',
        requestPublishError: 'Failed to send request for approval',
        unpublishSuccess: 'Course unpublished successfully',
        unpublishError: 'Failed to unpublish course',
      },

      modal: {
        delete: {
          title: 'Delete {item}',
          description: 'Are you sure you want to delete this {item}?',
        },
        changeContent: {
          title: 'Change {item}',
          description:
            'When you change the content type, the current content will be deleted. This action cannot be undone. Are you sure you want to change the content type?',
        },
        requestPublish: {
          title: 'Request For Approval',
          description:
            'This version needs to be reviewed by Admin before approval to publish. Please send request for approval.',
        },
        unpublish: {
          title: 'Unpublish Course',
          description:
            'When you unpublish this course, user can not find it in OpenEdu. Please be certain before action!',
        },
        requestPublishSuccess: {
          title: 'Your Course Is Successfully Sent To Admin!',
          description:
            'This version needs to be reviewed by Admin Open Edu and Admin Organization before approval to publish. Please wait till the course is approval for publishing.',
        },
      },
    },

    // Form validation messages
    validation: {
      errors: 'Validation Errors',
      pleaseFixErrors: 'Please fill in all required fields before saving:',
      publishRequired: 'Please fill in all required fields before publishing:',

      required: '{field} is required',
      minLength: '{field} must be at least {min} characters',
      maxLength: '{field} must be less than {max} characters',
      minMaxCourseName: 'Course name must be between {min} and {max} characters',
      minMaxCourseDescription: 'Course description must be between {min} and {max} characters',
      minPlaylistLink: 'Playlist link must be at least {min} characters',
      invalidPlaylistLink: 'Invalid playlist link',
      language: 'Language is required',
      questionNumber: 'There must be at least 1 question',
      invalidUrl: 'Invalid URL format',
      maxFileSize: 'File size must be less than {size}MB',
      supportedFormats: 'Supported formats: {formats}',
      minItems: 'Must have at least {min} {item}',
      maxItems: 'Cannot have more than {max} {item}',
      levelMin: 'Must have at least {min} level',
      categoryMin: 'Must have at least {min} category',
      durationMin: 'Duration must be greater than {min}',
      studyLoadMinMax: 'Study load must be between {min} to {max} {unit}',
      leanerInfo: 'Learner info is required',
      contentInfo: 'Content info is required',
      genThumbnail: 'Thumbnail is required',
      title: 'Title is required',
      sectionTitle: 'Section title is required',
      lessonTitle: 'Lesson title is required',
      sectionRequired: 'There must be at least 1 section have status publish or preview',
      lessonRequired: 'There must be at least 1 lesson have status publish or preview in the published section',
      sectionOrLessonRequired: 'There must be at least 1 section and 1 lesson have status publish or preview',
      content: {
        required: 'Content is required',
        videoRequired: 'Video content is required',
        pdfRequired: 'PDF content is required',
        embeddedRequired: 'Embedded content is required',
      },

      quiz: {
        pointsMin: 'Points must be greater than 0',
        itemsMin: 'Must have at least 1 answer',
        titleRequired: 'Quiz title is required',
        questionTitleRequired: 'Quiz question title is required',
        questionRequired: 'Must have at least 1 question',
        correctAnswerRequired: 'Must select at least one correct answer',
      },
    },

    // Course information section
    information: {
      title: 'Course Information',

      sections: {
        description: {
          title: 'Description',
          subtitle: 'The description is used to describe the course.',
          placeholder: 'Write description here',
        },
        outcomes: {
          title: 'Learner Outcome',
          subtitle: 'Result of learning for learners, you can add many different learning results',
          placeholder: 'Write outcome here',
          addButton: 'Add outcome',
        },
        thumbnail: {
          title: 'Thumbnail',
          subtitle: 'The thumbnail is used to represent the course in the course list.',
        },
        previewVideos: {
          title: 'Preview Videos',
          subtitle: 'The preview videos is used to preview the course.',
          uploadButton: 'Upload video',
        },
        reference: {
          title: 'References',
          subtitle: 'References is used to refer the course. This file must be less than 10MB.',
          uploadButton: 'Upload file',
        },
        category: {
          title: 'Category',
          subtitle: 'The category is used to categorize the course.',
          placeholder: 'Select category',
          searchPlaceholder: 'Search category',
        },
        level: {
          title: 'Level',
          subtitle: 'The level is used to categorize the course.',
          placeholder: 'Select level',
        },
        supportChannels: {
          title: 'Support channels',
          subtitle: 'The support channels is used to support the course.',
          addButton: 'Add channel',
        },
        markAsCompleted: {
          title: 'Mark as completed',
          subtitle:
            'Enabling this toggle marks your course as complete, allowing learners to receive certificates (if any) and preventing any further edits to the course outline.',
        },
      },
    },

    // Course outline section
    outline: {
      title: 'Course Outline',
      description: 'Organize your course content',

      section: {
        title: 'Section',
        actions: {
          addNew: 'Add new section',
          edit: 'Edit section',
          delete: 'Delete section',
          duplicate: 'Duplicate section',
          move: 'Move section',
          collapse: 'Collapse section',
          expand: 'Expand section',
        },
        form: {
          title: 'Section title',
          description: 'Section description',
          isPublic: 'Make section public',
          order: 'Section order',
        },
      },

      lesson: {
        title: 'Lesson',
        contentTitle: 'Lesson content',
        actions: {
          addNew: 'Add new lesson',
          edit: 'Edit lesson',
          delete: 'Delete lesson',
          duplicate: 'Duplicate lesson',
          move: 'Move lesson',
          addQuiz: 'Add Quiz',
          save: 'Save lesson',
          preview: 'Preview lesson',
          publish: 'Publish lesson',
        },
        contentTypes: {
          text: 'Text content',
          video: 'Video content',
          pdf: 'PDF content',
          embedded: 'Embedded content',
          quiz: 'Quiz content',
        },
        form: {
          title: 'Lesson title',
          description: 'Lesson description',
          isPublic: 'Make lesson public',
          order: 'Lesson order',
          duration: 'Lesson duration',
          prerequisites: 'Prerequisites',
        },
        content: {
          textEditor: {
            placeholder: 'Start writing your content...',
          },
          quiz: {
            titlePlaceholder: 'Quiz title',
            label: 'Quiz',
            alert: 'Quiz here is a content of lesson, it will be displayed in the lesson in the order of the contents.',
            types: {
              singleChoice: 'Single choice',
              multipleChoice: 'Multiple choice',
              trueFalse: 'True/False',
              shortAnswer: 'Short answer',
              essay: 'Essay',
            },
            timeLimit: {
              perQuestion: 'Per question',
              overall: 'Overall',
            },
            passCriteria: {
              correctAnswers: 'Correct answers',
              percentage: 'Percentage',
            },
            settings: {
              title: 'Quiz settings',
              timeLimit: 'Time limit',
              timeLimitInfo: 'When enabled, Set the time limit for the quiz',
              passingScore: 'Passing score',
              passingScoreInfo: 'Set the passing score for the quiz',
              attempts: 'Allowed attempts',
              attemptsInfo: 'Set the allowed attempts for the quiz',
              randomize: 'Randomize questions',
              randomizeInfo: 'Randomize the questions of the quiz',
              showResults: 'Show results immediately',
              showResultsInfo: 'Show the results of the quiz immediately',
              shuffleChoices: 'Shuffle choices',
              shuffleChoicesInfo: 'Shuffle the choices of the quiz',
              shuffleQuestions: 'Shuffle questions',
              shuffleQuestionsInfo: 'Shuffle the questions of the quiz',
              showCorrectAnswers: 'Show correct answers',
              showCorrectAnswersInfo: 'Show the correct answers of the quiz',
              submissionLimit: 'Submission limit',
              submissionLimitInfo: 'When enabled, set the maximum number of times learners can retake the quiz',
              timeBonusPoints: 'Time bonus points',
              timeBonusPointsInfo:
                'When enabled, set bonus points for each remaining second when completing the quiz. The faster they complete, the more bonus points they get',
              passCriteria: 'Pass criteria',
              passCriteriaMin: 'Minimum pass criteria',
              penaltyPoints: 'Penalty points',
              penaltyPointsInfo: 'When enabled, set points deducted for each incorrect answer',
              streakBonus: 'Streak bonus',
              streakBonusInfo:
                'When enabled, set percentage increase for each consecutive correct answer in the first input (e.g. 10% = +10%, +20%, +30%...). The second input limits the maximum bonus percentage possible.',
              streakBonusPercentageIncrement: 'Streak bonus percentage increment',
              streakBonusMaxPercentage: 'Streak bonus max percentage',
              streakBonusType: 'Streak bonus type',
              showAtPercentage: 'Show quiz when reach percentage',
              showAtPercentageInfo: 'Set the percentage of the lesson to show the quiz',
              percentage: 'Percentage',
              showAtPageNumber: 'Show quiz when reach page number',
              showAtPageNumberInfo: 'Set the page number of the lesson to show the quiz',
              pageNumber: 'Page number',
              showAtTimestamp: 'Show quiz when reach timestamp',
              showAtTimestampInfo: 'Set the timestamp of the lesson to show the quiz',
              timeDuration: 'Time duration',
            },
            question: {
              title: 'Quiz Question',
              add: 'Add question',
              edit: 'Edit question',
              delete: 'Delete question',
              type: 'Question type',
              points: 'Points',
              required: 'Required question',
              answers: 'Answers',
              answerPlaceholder: 'Enter answer',
              correctAnswer: 'Correct answer',
              explanation: 'Explanation',
              explanationPlaceholder: 'Enter explanation',
              timeLimit: 'Time limit',
              addAnswer: 'Add answer',
              notIncludedYet: 'Not included yet',
              noQuestion: 'No question',
            },
          },
          placeholder: {
            embedded: 'Enter embed video URL',
          },
          alert: {
            embedded:
              'We only support embed video from YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, and some other platforms.',
          },
        },
      },
    },

    price: {
      title: 'Price Settings',
      fiatCurrency: 'Fiat currency',
      fiatCurrencyInfo:
        'Select the fiat currency for the course. Currently, we support 2 types of fiat currencies: USD and VND',
      unitCost: 'Unit cost',
      unitCostInfo: 'Set the unit cost for the course',
      discountPrice: 'Discount price',
      discountPriceInfo: 'Set the discount price for the course',
      finalPrice: 'Final price',
      finalPriceInfo: 'Set the final price for the course',
      free: 'Free',
      isFreeInfo: 'When enabled, the course will be free',
      enableCrypto: 'Enable token payment',
      enableCryptoInfo: 'When enabled, the course will be paid in token',
      cryptoCurrency: 'Token currency',
      cryptoCurrencyInfo:
        'Select the token currency for the course. Currently, we support 3 types of tokens: NEAR, USDC, and USDT',
      cryptoUnitCost: 'Token unit cost',
      cryptoUnitCostInfo: 'Set the token unit cost for the course',
      cryptoPrice: 'Token price',
      cryptoPriceInfo: 'Set the token price for the course',
      cryptoDiscountPrice: 'Token discount price',
      cryptoDiscountPriceInfo: 'Set the token discount price for the course',
      exchangeRate: 'Exchange Rate',
      lastUpdated: 'Last updated',
      syncToCrypto: 'Sync to Token',
      syncToFiat: 'Sync to Fiat',
    },

    certificate: {
      title: 'Certificate',
      display: 'Certificate Display',
      displayDescription:
        'Configure whether learners can receive a certificate upon course completion. This setting determines if the course offers a certificate.',
      selectTemplate: 'Select Template',
    },

    // Course creation
    create: {
      title: 'Create New Course',
      youtube: 'AI Generate Course From YouTube',
      ai: 'AI Generate Course',
      form: {
        includeSummary: 'Include summary',
        includeQuiz: 'Include quiz',
        tone: 'Voice tone',
        playlistLink: 'Playlist link',
        language: 'Language',
        numberOfQuestion: 'Number of question for each quiz',
        name: 'Name',
        description: 'Description',
        quizType: 'Quiz Type',
      },
    },

    // Course categories
    categories: {
      title: 'Course Categories',
      addCategory: 'Add category',
      newCategory: 'New category',
    },

    // Tabs
    tabs: {
      courseInformation: 'Information',
      courseOutline: 'Outline',
      coursePrice: 'Price',
      courseCertificate: 'Certificate',
      courseTrigger: 'Trigger',
      courseCollaborators: 'Collaborators',
      courseLearners: 'Learners',
      courseHistory: 'History',
    },

    // Course types and tones
    types: {
      youtube: 'Youtube',
      ai: 'AI',
      manual: 'Manual',
    },

    tone: {
      normal: 'Normal',
      humorous: 'Humorous',
      professional: 'Professional',
    },

    share: {
      referral: 'Referral',
      permalink: 'Permalink',
    },

    aiCourse: {
      aiCreation: 'AI Creation',
      courseOutline: 'Course Outline',
      generalInfo: 'General Information',
      setupCourseOutline: 'Set Up Course Outline',
      setupCourseOutlineDesc: "We'll use this information to generate the best content for your course.",
      setupCourseInfo: 'Set Up General Information',
      setupCourseInfoDesc: "We'll use this information to generate the best content for your course.",
      learnerInfo: 'Learner Information (Background, Level, Goal...)',
      courseContent: 'Course Content Information (Learning Structure, Learning Outcome...)',
      materialContent: 'Material Content (PDF...)',
      courseLevel: 'Course Level',
      language: 'Language',
      courseDuration: 'Course Duration',
      studyLoad: 'Study Load (Hour Per Day)',
      hour: 'Hour',
      week: 'Week',
      day: 'Day',
      setupGeneralInfo: 'Set Up General Information',
      title: 'Title',
      description: 'Description',
      genAIForThumbnail: 'Gen AI For Thumbnail ({number} time left)',
      genAIForThumbnail2: 'Gen AI For Thumbnail ({number} times left)',
      thumbnailDesc: 'Thumbnail Description',
      thumbnailPlaceholder: 'Describe your thumbnail',
      genThumbnail: 'Generate Thumbnail',
      fieldRequired: 'Please fill in all required fields before generating the course.',
      aiGenerateLoading: 'AI Generate Loading',
      aiCreateError: 'Error create AI course',
      loadingMessage: "Stay Still. We're about to bring you something amazing.",
      openNewTab: 'Open New Tab To Work',
      failedMessage: 'Fail Loading',
      back: 'Back',
    },
  },
};
