export const referralProgramMessages = {
  referralProgram: {
    header: {
      refCount: '{count} Ref',
      pointsEarned: '+{points} {suffix}',
      balancePoint: 'Balance Points',
      timeline: 'Timeline',
      totalReferrals: 'Total Referrals',
      viewAll: 'View All',
      points: 'Points',
      totalEarnedPoints: 'Total Earned Points',
    },
    invite: {
      getPoints: 'Get {points} Points',
      dropEmailMessage: "Drop your friend's Email here to earn reward points",
      friendEmailPlaceholder: "Friend's Email Address",
      sendButton: 'Send',
      requirementsTitle: 'Requirements To Earn Reward',
      checkmarkAriaLabel: 'Check mark icon',
      requirementRegistration: 'Friend must complete registration',
      requirementCourse: 'Friend must complete at least one course',
      eachRefereeReceives: 'Each referee may receive',
      inviteFriendsButton: 'Invite Friends',
      pointsAmount: '{count} points',
      whenCompleteRequirements: 'when complete all requirement.',
      referralCodeUsageWarning: 'Each user can only use referral code once. Choose carefully!',
      bothReceiveReward: 'Both you and your referee will receive reward when you complete this',
    },
    inviteFriend: {
      inviteSuccess: 'Invite Success',
      emailRequired: 'Email is required',
      modal: {
        title: 'Invite Friend',
        yourReferralCode: 'Your Referral Code',
        referralLink: 'Referral Link',
        copied: 'Copied',
      },
      successModal: {
        title: 'You Have Successfully Claimed {point} Points!',
        description: 'Continue to explore and submit all your mission to get more reward points from OpenEdu!!!',
        closeButton: 'Back To Referral Dashboard',
      },
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Simple step to start earning rewards',
      step1: {
        title: 'Share Your Link',
        description: 'Copy your unique referral link or share directly to social media',
      },
      step2: {
        title: 'Friend Join OpenEdu',
        description: 'Your friend click the link and create their account',
      },
      step3: {
        title: 'Enter Referral Email',
        description: 'They enter your referral code during registration',
      },
      step4: {
        title: 'Both Get Rewards',
        description: 'You both earn points when they complete the requirements',
      },
    },
    availableReward: {
      title: 'Available Reward To Claim',
      claimButton: 'Claim {points} Points',
      subtitle: 'One click to claim! Point will be added to your wallet after claiming.',
      pointsEarned: '+ {points} {suffix} ',
      points: 'Points',
      claimSuccess: 'Claim Success',
      baseReferrals: {
        title: 'Base Referral Reward',
        description: 'Successful referrals - {points} points',
      },
      milestone: {
        title: 'Milestone Achievements',
        description: 'Reach milestone: {count} Referrals',
      },
      featuresDiscovery: {
        title: 'Feature Discovery',
        description: 'Course: {course} · Fiat: {fiat} · Token: {token}',
      },
      timeBasedReward: {
        title: 'Time-based Reward',
        description: 'First Week Multiplier: {points} points',
      },
      streakBonus: {
        title: 'Streak Bonus',
        description: 'Weekly: {weekly} points · Monthly: {monthly} points',
      },
      registrationRewards: {
        title: 'Registration Reward',
        description: 'Complete all requirement: {points} points',
      },
    },
    advancedReward: {
      title: 'Earn More With Advanced Rewards',
      subtitle: 'Unlock additional rewards as your referrals engage with OpenEdu',
      activityBonus: {
        title: 'Activity Bonus Rewards',
        tokenDeposit: {
          title: 'Token Deposit',
          pointsPerDeposit: '+{points} {suffix} / First Deposit',
          totalPoints: '{deposits} Deposits = {points} Points earned',
          description: "Reward for referee's first token deposit",
          points: 'Points',
        },
        fiatDeposit: {
          title: 'Fiat Deposit',
          pointsPerDeposit: '+{points} {suffix} / First Deposit',
          totalPoints: '{deposits} Deposits = {points} points earned',
          description: "Reward for referee's first fiat deposit ",
          points: 'Points',
        },
        courseCompletion: {
          title: 'Course Completion',
          pointsCompletion: '+{points} {suffix} / First Completion',
          totalPoints: '{completions} Completions = {points} Points earned',
          description: "Reward for referee's first completion",
          points: 'Points',
        },
      },
      consistencyRewards: {
        title: 'Consistency Rewards',
        weeklyStreak: {
          title: 'Weekly Streak',
          pointsReward: '+ {points} {suffix}',
          daysRemaining: '{days} days remaining',
          progress: '{current}/{total}',
          point: 'Points',
        },
        monthlyStreak: {
          title: 'Monthly Streak',
          pointsReward: '+ {points} {suffix}',
          daysRemaining: '{days} days remaining',
          progress: '{current}/{total}',
          point: 'Points',
        },
      },
      timeBasedRewards: {
        title: 'Time-based Rewards',

        limitedTimeOffer: {
          title: 'Limited Time Offer',
          points: '+ {points} Point',
          description:
            '<highlight>{x}x Points Multiplier</highlight> for all referral activities - Valid from {fromDate} to {toDate}',
          daysLeft: '{days} days left',
        },
      },
    },
    dashboard: {
      programStatus: {
        title: 'Program Status',
        referralProgram: 'Referral Program',
        description: 'Enable or disable the entire referral program',
      },
      basicSettings: {
        title: 'Basic Settings',
        startDate: 'Start Date',
        endDate: 'End Date',
        referrerReward: 'Referrer Reward',
        refereeReward: 'Referee Reward',
        successCriteria: {
          title: 'Success Criteria',
          completeRegistration: 'Complete Registration',
          completeFirstCourse: 'Complete First Course',
        },
      },
      advancedRewards: {
        title: 'Advanced Reward System',
        milestones: {
          title: 'Milestone Rewards',
          description: 'Set rewards for reaching referral milestones',
          referralsEquals: 'referrals =',
          addNew: 'Add New Milestone',
        },
        featureDiscovery: {
          title: 'Feature Discovery Rewards',
          courseCompletion: 'Course Completion:',
          fiatWalletDeposit: 'Fiat Wallet Deposit:',
          tokenWalletDeposit: 'Token Wallet Deposit:',
        },
        timeBased: {
          title: 'Time-based Rewards',
          timeBasedReward: 'Time-Based Reward:',
          description:
            'Applies to referrals made during the first week after program activation. Example: When set to "100% of base", points for first-week referrals are doubled.',
        },
        streak: {
          title: 'Streak Rewards',
          threshold: 'Threshold',
          weekly: {
            title: 'Weekly Streak Settings',
            enable: 'Enable Weekly Streak:',
            referralsInWeek: 'referrals in a week',
          },
          monthly: {
            title: 'Monthly Streak Settings',
            enable: 'Enable Monthly Streak:',
            referralsInMonth: 'referrals in a month',
          },
          note: 'Note: Streak rewards are granted when the referrer reaches the threshold within the specified time period.',
        },
      },
      common: {
        fixed: 'Fixed',
        percentage: 'Percentage',
        value: 'Value',
        reward: 'Reward',
      },
      buttons: {
        saveChanges: 'Save Changes',
        cancel: 'Cancel',
      },
      toast: {
        success: 'Success',
      },
      errors: {
        amountRequired: 'Amount is required and must be greater than 0',
        typeRequired: 'Type is required',
        countRequired: 'Count must be at least 1',
        nameRequired: 'Program name is required',
        dateInvalid: 'Please enter a valid date',
        milestoneItemsRequired: 'At least one milestone is required',
        startDateRequired: 'Start date is required',
        endDateRequired: 'End date is required',
        rewardAmountRequired: 'Reward amount is required',
        rewardTypeRequired: 'Reward type is required',
        timeBasedRewardsRequired: 'Time-based rewards settings are required',
        rewardRequired: 'Reward is required',
        weeklyThresholdRequired: 'Weekly threshold is required',
        weeklyRewardAmountRequired: 'Weekly reward amount is required',
        weeklyRewardTypeRequired: 'Weekly reward type is required',
        monthlyThresholdRequired: 'Monthly threshold is required',
        monthlyRewardAmountRequired: 'Monthly reward amount is required',
        monthlyRewardTypeRequired: 'Monthly reward type is required',
        thresholdAndRewardRequired: 'Threshold and reward are required',
      },
    },
    history: {
      refereeId: 'Referee ID',
      refDate: 'Referral Date',
      amount: 'Amount',
    },
  },
};
