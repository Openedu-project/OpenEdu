export const referralProgramMessages = {
  referralProgram: {
    header: {
      refCount: '{count} Ref',
      pointsEarned: '+{points} points',
      balancePoints: 'Balance Points: {points}',
      totalReferrals: 'Total Referrals',
      viewAll: 'View All',
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
      pointsEarned: '+ {points} Point',
      baseReferral: {
        title: 'Base Referral Reward',
        description: '10 successful referrals - First week multiplier active',
      },
      milestone: {
        title: 'Milestone Achievements',
        description: 'Reach milestone: {count} Referrals',
      },
      featureDiscovery: {
        title: 'Feature Discovery',
        description: 'Course: {course} · Flip: {flip} · Token: {token}',
      },
      streakBonus: {
        title: 'Streak Bonus',
        description: 'Weekly: {weekly} points · Monthly: {monthly} points',
      },
      registrationReward: {
        title: 'Registration Reward',
        description: 'Complete all requirement: {points} point',
      },
    },
    advancedReward: {
      title: 'Earn More With Advanced Rewards',
      subtitle: 'Unlock additional rewards as your referrals engage with OpenEdu',
      activityBonus: {
        title: 'Activity Bonus Rewards',
        tokenDeposit: {
          title: 'Token Deposit',
          pointsPerDeposit: '+{points} Points / First Deposit',
          totalPoints: '{deposits} Deposits = {points} Points earned',
          description: "Reward for referee's first token deposit",
        },
        fiatDeposit: {
          title: 'Fiat Deposit',
          pointsPerDeposit: '+{points} Points / First Deposit',
          totalPoints: '{deposits} Deposits = {points} points earned',
          description: "Reward for referee's first fiat deposit ",
        },
        courseCompletion: {
          title: 'Course Completion',
          percentPerCompletion: '+{percent}% / First Completion',
          totalPoints: '{completions} Completions = {points} Points earned',
          description: "Reward for referee's first completion",
        },
      },
      consistencyRewards: {
        title: 'Consistency Rewards',
        weeklyStreak: {
          title: 'Weekly Streak',
          points: '+ {points} Point',
          daysRemaining: '{days} days remaining',
          progress: '{current}/{total}',
        },
        monthlyStreak: {
          title: 'Monthly Streak',
          points: '+ {points} Point',
          daysRemaining: '{days} days remaining',
          progress: '{current}/{total}',
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
  },
};
