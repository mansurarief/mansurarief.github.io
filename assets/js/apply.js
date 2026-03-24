/**
 * apply.js — V&V Lab Research Application Form
 * Dynamic position-aware form with progressive disclosure.
 */
(function ($) {
  'use strict';

  var API_URL = 'https://vvlab-apply-1013514588076.us-central1.run.app';
  var DRAFT_KEY = 'vvlab-apply-draft';

  // =========================================================================
  // Position configuration
  // =========================================================================
  var POS = {
    'Postdoctoral Researcher': {
      short: 'postdoc',
      msg: "Welcome, researcher. We\u2019re excited to learn about your work. This application focuses on your research trajectory and vision \u2014 we want to understand where you\u2019re headed and how V&V Lab can be the right environment for that.",
      durations: [['1 year','1 year'],['2 years','2 years'],['3 years','3 years']],
      showPos: ['postdoc'],
      reflectionLabel: 'Research vision & reflection',
      reflectionSub: 'Your current research program, future directions, and how V&V Lab aligns with your goals.',
      aiLabel: 'How will AI methods feature in your research agenda? <span class="req">*</span>',
      skillsSub: 'Your core technical competencies',
      affiliationPH: 'e.g. Research Scientist, MIT',
      refsLabel: 'References <span class="req">*</span> <span style="font-weight:400;color:var(--text-tertiary);font-size:0.82rem">(2 required)</span>',
      ref2Required: true,
      ref2Hidden: false,
      pitchRequired: true,
      pitchHidden: false,
      pitchHint: 'A concise 3-slide (5 min) presentation of your proposed research direction.',
      degreeHint: null,
      degreeExpect: 'PhD',
      extraRequired: ['years_since_phd', 'num_publications', 'current_research_focus']
    },
    'PhD Student': {
      short: 'phd',
      msg: "A PhD is a journey of discovery, and we\u2019re looking for curious minds ready to dive deep. Don\u2019t worry if your research direction isn\u2019t fully formed yet \u2014 we value potential and passion.",
      durations: [['Full program duration','Full program']],
      showPos: ['phd'],
      reflectionSub: 'Tell us what research questions excite you and what you\u2019d like to explore during your PhD.',
      aiLabel: 'How do you envision using AI in your doctoral work? <span class="req">*</span>',
      skillsSub: 'Tools and methods you\u2019re familiar with',
      affiliationPH: 'e.g. Research Assistant, MIT',
      refsLabel: 'References <span class="req">*</span> <span style="font-weight:400;color:var(--text-tertiary);font-size:0.82rem">(2 required)</span>',
      ref2Required: true,
      ref2Hidden: false,
      pitchRequired: true,
      pitchHidden: false,
      pitchHint: 'A concise 3-slide (5 min) pitch of your proposed research direction. No need to make it perfect \u2014 we want to see how you think.',
      degreeHint: "Master\u2019s degree holders are given preference.",
      degreeExpect: null,
      extraRequired: ['prior_research_experience']
    },
    "Master's Student": {
      short: 'masters',
      msg: "A Master\u2019s at V&V Lab combines strong coursework with meaningful research exposure. We\u2019re looking for motivated students who want to build a solid technical foundation.",
      durations: [['Full program duration','Full program']],
      showPos: ['masters'],
      reflectionSub: 'What topics interest you? What do you hope to learn and achieve during your Master\u2019s?',
      aiLabel: 'How might AI tools help in your studies and projects? <span class="req">*</span>',
      skillsSub: 'Technical skills you\u2019re building',
      affiliationPH: 'e.g. Senior student, KFUPM',
      refsLabel: 'References <span class="req">*</span> <span style="font-weight:400;color:var(--text-tertiary);font-size:0.82rem">(1 required, 2nd optional)</span>',
      ref2Required: false,
      ref2Hidden: false,
      pitchRequired: false,
      pitchHidden: false,
      pitchHint: 'Optional: a brief pitch of your research interests. Don\u2019t stress about it \u2014 it\u2019s not required.',
      degreeHint: null,
      degreeExpect: null,
      extraRequired: ['coursework_interests']
    },
    'Research Intern': {
      short: 'intern',
      msg: "Internships at V&V Lab are hands-on and project-driven. This is a lighter application \u2014 we mainly want to know what you\u2019re excited to learn and what skills you bring.",
      durations: [['3 months','3 months'],['6 months','6 months']],
      showPos: ['intern'],
      reflectionLabel: 'Learning goals',
      reflectionSub: 'What skills do you want to develop? What would a successful internship look like for you?',
      aiLabel: 'How would you use AI tools in your work? <span class="req">*</span>',
      skillsSub: 'What tools are you comfortable with?',
      affiliationPH: 'e.g. 3rd year CS, KFUPM',
      refsLabel: 'Reference <span class="req">*</span> <span style="font-weight:400;color:var(--text-tertiary);font-size:0.82rem">(1 required)</span>',
      ref2Required: false,
      ref2Hidden: true,
      pitchRequired: false,
      pitchHidden: true,
      pitchHint: '',
      degreeHint: null,
      degreeExpect: null,
      extraRequired: ['enrollment_status', 'expected_graduation']
    },
    'Visiting Faculty': {
      short: 'visit',
      msg: "Welcome, colleague. I\u2019m always looking for opportunities to collaborate with faculty from other institutions. Tell me about your research and how we might work together.",
      durations: [['1 month','1 month'],['3 months','3 months'],['6 months','6 months'],['1 year','1 year']],
      showPos: [],
      reflectionLabel: 'Collaboration vision',
      reflectionSub: 'What research synergies do you see? What would you like to accomplish during your visit?',
      aiLabel: 'How does AI feature in your research or teaching? <span class="req">*</span>',
      skillsSub: 'Your core expertise and methods',
      affiliationPH: 'e.g. Associate Professor, University of Tokyo',
      refsLabel: 'References <span class="req">*</span>',
      ref2Required: false,
      ref2Hidden: true,
      pitchRequired: false,
      pitchHidden: false,
      pitchHint: 'Optional: a brief overview of your proposed collaboration or seminar topic.',
      degreeHint: null,
      degreeExpect: 'PhD',
      extraRequired: []
    }
  };

  // =========================================================================
  // Helpers
  // =========================================================================
  function debounce(fn, ms) {
    var t;
    return function () { var c = this, a = arguments; clearTimeout(t); t = setTimeout(function () { fn.apply(c, a); }, ms); };
  }
  function fmtBytes(b) { return b < 1048576 ? (b / 1024).toFixed(1) + ' KB' : (b / 1048576).toFixed(1) + ' MB'; }
  function scrollTo($el) { if ($el.length) $('html,body').animate({ scrollTop: $el.offset().top - 140 }, 400); }
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function isPhone(v) { return /^[+]?[\d\s\-().]{7,}$/.test(v); }
  function getPos() { return $('input[name="position_type"]:checked').val() || ''; }
  function getCfg() { return POS[getPos()] || null; }
  function translateSelectOptions($sel, map) {
    $sel.find('option').each(function () {
      var key = map[$(this).val()];
      if (key) $(this).text(t(key) || $(this).text());
      if ($(this).val() === '' && $(this).is(':disabled')) $(this).text(t('opt_select') || 'Select');
    });
  }

  // =========================================================================
  // Error display
  // =========================================================================
  function showErr($f, msg) {
    clearErr($f);
    $f.addClass('apply-input--error');
    $f.closest('.apply-field, .apply-upload, .apply-role-grid, .apply-pill-grid, .apply-check, .apply-consent')
      .first().append('<div class="apply-error-msg">' + msg + '</div>');
  }
  function clearErr($f) {
    $f.removeClass('apply-input--error');
    $f.closest('.apply-field, .apply-upload, .apply-role-grid, .apply-pill-grid, .apply-check, .apply-consent')
      .first().find('.apply-error-msg').remove();
  }
  function clearAll() { $('.apply-error-msg').remove(); $('.apply-input--error').removeClass('apply-input--error'); }

  // =========================================================================
  // File validation
  // =========================================================================
  var FR = {
    cv:             { max: 5242880, exts: ['pdf'], label: '5 MB', tl: 'PDF' },
    reflection_pdf: { max: 5242880, exts: ['pdf'], label: '5 MB', tl: 'PDF' },
    pitch_deck:     { max: 20971520, exts: ['pdf','pptx'], label: '20 MB', tl: 'PDF or PPTX' }
  };
  function checkFile(id) {
    var el = document.getElementById(id);
    if (!el || !el.files || !el.files.length) return true;
    var f = el.files[0], r = FR[id]; if (!r) return true;
    if (f.size > r.max) { showErr($(el), (t('err_file_size') || 'File exceeds size limit') + ' (' + r.label + ')'); return false; }
    var ext = f.name.split('.').pop().toLowerCase();
    if (r.exts.indexOf(ext) === -1) { showErr($(el), (t('err_file_type') || 'Invalid file type') + ' (' + r.tl + ')'); return false; }
    return true;
  }

  // =========================================================================
  // Position-aware validation
  // =========================================================================
  function validate() {
    clearAll();
    var ok = true, $first = null, cfg = getCfg();
    if (!cfg) { showErr($('.apply-role-grid'), t('err_select_position') || 'Select a position'); return false; }

    function fail($el, msg) { showErr($el, msg); ok = false; if (!$first) $first = $el; }
    var REQ = t('err_required') || 'Required';

    // Always required
    ['full_name','email','phone','nationality','residence','affiliation',
     'degree','field','institution','gpa','graduation_date','english_proficiency',
     'start_date','duration'].forEach(function (id) {
      var $el = $('#' + id);
      if ($el.length && !$.trim($el.val())) fail($el, REQ);
    });

    // Short name required
    if (!$.trim($('#short_name').val())) fail($('#short_name'), REQ);

    // Email format
    var ev = $.trim($('#email').val());
    if (ev && !isEmail(ev)) fail($('#email'), t('err_invalid_email') || 'Invalid email');
    ['ref1_email','ref2_email'].forEach(function (id) {
      var v = $.trim($('#' + id).val());
      if (v && !isEmail(v)) fail($('#' + id), t('err_invalid_email') || 'Invalid email');
    });
    if ($.trim($('#phone').val()) && !isPhone($.trim($('#phone').val()))) fail($('#phone'), t('err_invalid_phone') || 'Invalid phone');

    // English score
    var ep = $('#english_proficiency').val();
    if ((ep === 'IELTS' || ep === 'TOEFL') && !$.trim($('#english_score').val()))
      fail($('#english_score'), t('err_score_required') || 'Score required');

    // Degree validation for postdoc
    if (cfg.degreeExpect && $('#degree').val() !== cfg.degreeExpect)
      fail($('#degree'), t('err_degree_phd') || 'PhD required for this position');

    // CV always required
    if (!document.getElementById('cv').files.length) fail($('#cv'), t('err_cv_required') || 'CV required');
    else if (!checkFile('cv')) { ok = false; if (!$first) $first = $('#cv'); }

    // Pitch deck — position dependent
    if (cfg.pitchRequired) {
      if (!document.getElementById('pitch_deck').files.length) fail($('#pitch_deck'), t('err_pitch_required') || 'Pitch deck required');
      else if (!checkFile('pitch_deck')) { ok = false; if (!$first) $first = $('#pitch_deck'); }
    } else if (document.getElementById('pitch_deck').files.length) {
      if (!checkFile('pitch_deck')) { ok = false; if (!$first) $first = $('#pitch_deck'); }
    }

    // Reflection
    var rt = $('input[name="reflection_type"]:checked').val();
    if (rt === 'write' && !$.trim($('#reflection_text').val())) fail($('#reflection_text'), 'Required');
    if (rt === 'upload') {
      var rEl = document.getElementById('reflection_pdf');
      if (!rEl || !rEl.files.length) fail($('#reflection_pdf'), 'Required');
      else if (!checkFile('reflection_pdf')) { ok = false; if (!$first) $first = $('#reflection_pdf'); }
    }

    // Research areas
    if (!$('input[name="research_areas"]:checked').length) fail($('.apply-pill-grid').first(), t('err_select_one') || 'Select at least one');
    if ($('input[name="research_areas"][value="Other"]').is(':checked') && !$.trim($('#research_area_other').val()))
      fail($('#research_area_other'), t('err_specify') || 'Please specify');

    // AI plans
    if (!$.trim($('#ai_plans').val())) fail($('#ai_plans'), 'Required');

    // Funding
    if (!$('input[name="funding_status"]:checked').length) fail($('input[name="funding_status"]').first(), 'Required');
    if ($('input[name="funding_status"]:checked').val() === 'Have external fellowship' && !$.trim($('#fellowship_name').val()))
      fail($('#fellowship_name'), 'Required');

    // Position-specific extra required fields
    if (cfg.extraRequired) {
      cfg.extraRequired.forEach(function (id) {
        var $el = $('#' + id);
        if ($el.length && $el.is(':visible') && !$.trim($el.val())) fail($el, 'Required');
      });
    }

    // Consent
    if (!$('#consent_data').is(':checked')) fail($('#consent_data'), 'Required');
    if (!$('#consent_accuracy').is(':checked')) fail($('#consent_accuracy'), 'Required');

    if ($first) scrollTo($first);
    return ok;
  }

  // =========================================================================
  // Position dynamics — the core UX engine
  // =========================================================================
  var sectionsRevealed = false;

  function applyPositionConfig(posType) {
    var cfg = POS[posType];
    if (!cfg) return;

    // 1. Show welcome message in right sidebar tip (personalized)
    updateWelcomeMessage(cfg);
    $('#preselectHint').stop(true).fadeOut(200);

    // 2. Cascade-reveal gated sections + show topbar
    if (!sectionsRevealed) {
      sectionsRevealed = true;
      $('#stepsTracker').fadeIn(300);
      $('#sideNav').fadeIn(400);
      $('#sideTips').fadeIn(400);
      $('.apply-section--gated:not(:visible)').each(function (i) {
        var $s = $(this);
        setTimeout(function () {
          $s.show().addClass('apply-section--reveal');
        }, i * 60);
      });
    }

    // 3. Show/hide dynamic fields based on data-pos
    $('.apply-field--dyn').each(function () {
      var $el = $(this);
      var posAttr = ($el.data('pos') || '').split(',');
      if (posAttr.indexOf(cfg.short) !== -1) {
        $el.slideDown(250);
      } else {
        $el.slideUp(200);
        // Clear values of hidden fields
        $el.find('input, textarea, select').val('');
      }
    });

    // 4. Repopulate duration dropdown
    var $dur = $('#duration');
    var curVal = $dur.val();
    $dur.find('option:not(:first)').remove();
    cfg.durations.forEach(function (d) {
      $dur.append('<option value="' + d[0] + '">' + d[1] + '</option>');
    });
    // Auto-select if only one option
    if (cfg.durations.length === 1) {
      $dur.val(cfg.durations[0][0]);
    } else if (curVal) {
      $dur.val(curVal); // restore if still valid
    }

    // 5. Update contextual microcopy (translated)
    applyPositionMicrocopy(posType);

    // Refs label (translated)
    updateRefsLabel(cfg);

    // 6. Degree hint
    if (cfg.degreeHint) {
      $('#degreeHint').text(cfg.degreeHint).slideDown(200);
    } else {
      $('#degreeHint').slideUp(200);
    }

    // 7. Pitch deck visibility
    if (cfg.pitchHidden) {
      $('#pitchField').slideUp(200);
      $('#pitchHint').slideUp(200);
    } else {
      $('#pitchField').slideDown(250);
      var pitchHintText = cfg.pitchRequired ? (t('pos_pitch_req') || cfg.pitchHint) : (t('pos_pitch_opt') || cfg.pitchHint);
      $('#pitchHint').text(pitchHintText).slideDown(250);
      // Show optional badge if not required
      if (!cfg.pitchRequired) {
        if (!$('#pitchOptBadge').length) {
          $('#pitchField .apply-upload__text strong').after('<span class="apply-pitch-optional" id="pitchOptBadge"></span>');
        }
        $('#pitchOptBadge').text(t('lbl_optional') || 'optional').show();
      } else {
        $('#pitchOptBadge').hide();
      }
    }

    // 8. Reference 2 visibility
    if (cfg.ref2Hidden) {
      $('#ref2Card').slideUp(200);
    } else {
      $('#ref2Card').slideDown(250);
      // Mark ref2 fields as required or not
      $('#ref2Card input').each(function () {
        if (cfg.ref2Required) {
          $(this).attr('placeholder', $(this).attr('placeholder').replace(' (optional)', ''));
        } else {
          var ph = $(this).attr('placeholder');
          if (ph && ph.indexOf('(optional)') === -1) {
            $(this).attr('placeholder', ph + ' (optional)');
          }
        }
      });
    }

    // 9. Update sidebar links per position
    updatePositionLinks(cfg);

    // 10. Update extra document suggestions
    updateExtraSuggestions();

    // 10. Fellowship pill visibility for intern
    if (cfg.short === 'intern') {
      $('#fellowshipPill').hide();
    } else {
      $('#fellowshipPill').show();
    }

    // 10. Recalculate progress
    calcProgress();
  }

  // =========================================================================
  // Conditionals (non-position)
  // =========================================================================
  function setupConditionals() {
    // Name entry — show welcome message and reveal role section
    var roleRevealed = false;
    $('#short_name').on('input', debounce(function () {
      var name = $.trim($(this).val());
      if (name && !roleRevealed) {
        roleRevealed = true;
        var greeting = getGreeting();
        $('#welcomeMsgText').text('Nice to meet you, ' + greeting + '. Which role are you interested in?');
        $('#welcomeMsg').fadeIn(300);
        // Reveal role section
        $('#sec-1').show().addClass('apply-section--reveal');
      }
      if (name) {
        var greeting = getGreeting();
        $('#welcomeMsgText').text('Nice to meet you, ' + greeting + '. Which role are you interested in?');
        // Update position welcome if already selected
        updateWelcomeMessage();
      }
      if (!name) {
        $('#welcomeMsg').fadeOut(200);
      }
    }, 300));

    $('#designation').on('change', function () {
      var name = $.trim($('#short_name').val());
      if (name) {
        var greeting = getGreeting();
        $('#welcomeMsgText').text('Nice to meet you, ' + greeting + '. Which role are you interested in?');
        updateWelcomeMessage();
      }
    });

    // Position selection — apply config and reveal rest of form
    $('input[name="position_type"]').on('change', function () {
      applyPositionConfig($(this).val());
    });

    // Extra documents — position-aware suggestions
    var EXTRA_DOCS = {
      'Postdoctoral Researcher': [
        { label: 'Cover letter', icon: 'fa-file-alt' },
        { label: 'Publication list', icon: 'fa-list' },
        { label: 'Research statement', icon: 'fa-file-contract' },
        { label: 'Teaching portfolio', icon: 'fa-chalkboard' }
      ],
      'PhD Student': [
        { label: 'Cover letter', icon: 'fa-file-alt' },
        { label: 'Transcripts', icon: 'fa-scroll' },
        { label: 'Degree certificate', icon: 'fa-certificate' },
        { label: 'Writing sample / publication', icon: 'fa-pen-fancy' }
      ],
      "Master's Student": [
        { label: 'Transcripts', icon: 'fa-scroll' },
        { label: 'Degree certificate', icon: 'fa-certificate' },
        { label: 'Cover letter', icon: 'fa-file-alt' }
      ],
      'Research Intern': [
        { label: 'Transcripts', icon: 'fa-scroll' },
        { label: 'Cover letter', icon: 'fa-file-alt' }
      ],
      'Visiting Faculty': [
        { label: 'Cover letter', icon: 'fa-file-alt' },
        { label: 'Publication list', icon: 'fa-list' },
        { label: 'Collaboration proposal', icon: 'fa-handshake' }
      ]
    };

    var DOC_TYPES = [
      'Cover Letter', 'Transcripts', 'Diploma / Degree Certificate',
      'Representative Paper', 'Research Statement', 'Teaching Portfolio',
      'Publication List', 'Collaboration Proposal', 'Writing Sample',
      'Letter of Recommendation', 'Other'
    ];

    var extraCount = 0;
    function addExtraUpload(label) {
      if (extraCount >= 6) return;
      extraCount++;
      var id = 'extra_' + extraCount;
      var title = label || '';

      // Build type selector options
      var opts = '<option value="" disabled' + (title ? '' : ' selected') + '>Document type</option>';
      DOC_TYPES.forEach(function (dt) {
        opts += '<option value="' + dt + '"' + (dt === title ? ' selected' : '') + '>' + dt + '</option>';
      });

      var $row = $(
        '<div class="apply-extra-row" style="margin-top:12px">' +
          '<div class="apply-extra-row__type">' +
            '<select class="apply-input apply-extra-type" name="extra_type_' + extraCount + '">' + opts + '</select>' +
          '</div>' +
          '<div class="apply-upload" data-for="' + id + '">' +
            '<input type="file" id="' + id + '" name="' + id + '" class="apply-upload__input" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg">' +
            '<div class="apply-upload__zone">' +
              '<div class="apply-upload__icon"><i class="fas fa-file-upload"></i></div>' +
              '<div class="apply-upload__text"><strong>' + (title || 'Choose file') + '</strong><span>PDF, DOC, or image &middot; Max 10 MB</span></div>' +
            '</div>' +
            '<div class="apply-upload__status"></div>' +
          '</div>' +
          '<button type="button" class="apply-extra-remove" title="Remove">&times;</button>' +
        '</div>'
      );

      // Update upload zone label when type changes
      $row.find('.apply-extra-type').on('change', function () {
        $row.find('.apply-upload__text strong').text($(this).val() || 'Choose file');
      });

      // Remove row
      $row.find('.apply-extra-remove').on('click', function () {
        $row.slideUp(200, function () { $row.remove(); extraCount--; $('#addExtraBtn').show(); });
      });

      $('#extrasWrap').append($row);
      initUpload($row.find('.apply-upload'));
      if (extraCount >= 6) $('#addExtraBtn').hide();
    }

    // Render suggested doc chips based on position
    function updateExtraSuggestions() {
      var pos = getPos();
      var docs = EXTRA_DOCS[pos] || [];
      var $suggest = $('#extrasSuggest').empty();
      if (!docs.length) return;
      docs.forEach(function (d) {
        var $chip = $('<button type="button" class="apply-extra-chip"><i class="fas ' + d.icon + '"></i> ' + d.label + '</button>');
        $chip.on('click', function () {
          addExtraUpload(d.label);
          $(this).fadeOut(200, function () { $(this).remove(); });
        });
        $suggest.append($chip);
      });
    }

    $('#addExtraBtn').on('click', function () { addExtraUpload(); });

    // Start over
    $('#startOverBtn').on('click', function () {
      if (!confirm('Are you sure you want to start over? All entered data will be cleared.')) return;
      try { localStorage.removeItem(DRAFT_KEY); } catch (_) {}
      window.location.reload();
    });

    // Refs toggle
    $('#refsToggle').on('click', function () {
      var $cards = $('#refsCards');
      if ($cards.is(':visible')) {
        $cards.slideUp(200);
        $(this).html('Add references <span>&plus;</span>');
      } else {
        $cards.slideDown(250);
        $(this).html('Hide references <span>&minus;</span>');
      }
    });

    // English score
    $('#english_proficiency').on('change', function () {
      var v = $(this).val();
      if (v === 'IELTS' || v === 'TOEFL') $('#englishScoreField').slideDown(200);
      else { $('#englishScoreField').slideUp(200); $('#english_score').val(''); }
    });

    // Reflection toggle
    $('input[name="reflection_type"]').on('change', function () {
      if ($(this).val() === 'write') { $('#reflectionUploadField').slideUp(200); $('#reflectionWriteField').slideDown(200); }
      else { $('#reflectionWriteField').slideUp(200); $('#reflectionUploadField').slideDown(200); }
    });

    // Funding
    $('input[name="funding_status"]').on('change', function () {
      if ($('input[name="funding_status"]:checked').val() === 'Have external fellowship') $('#fellowshipField').slideDown(200);
      else { $('#fellowshipField').slideUp(200); $('#fellowship_name').val(''); }
    });

    // Research area "Other"
    $(document).on('change', 'input[name="research_areas"]', function () {
      if ($('input[name="research_areas"][value="Other"]').is(':checked')) $('#otherAreaField').slideDown(200);
      else { $('#otherAreaField').slideUp(200); $('#research_area_other').val(''); }
    });
  }

  // =========================================================================
  // File uploads
  // =========================================================================
  function initUpload($wrap) {
    var id = $wrap.data('for');
    var $input = $('#' + id), $zone = $wrap.find('.apply-upload__zone'), $status = $wrap.find('.apply-upload__status');

    $zone.on('click', function () { $input.trigger('click'); });

    function show(f) {
      $status.html('<span class="fname">' + $('<span>').text(f.name).html() + '</span><span class="fsize">' + fmtBytes(f.size) + '</span><button type="button" class="fremove">Remove</button>').addClass('visible');
      $zone.addClass('has-file');
      clearErr($input);
    }
    function clear() {
      $input.val(''); $input.wrap('<form>').closest('form')[0].reset(); $input.unwrap();
      $status.html('').removeClass('visible'); $zone.removeClass('has-file');
    }
    $input.on('change', function () { this.files && this.files.length ? show(this.files[0]) : clear(); });
    $status.on('click', '.fremove', function (e) { e.stopPropagation(); clear(); });

    $zone.on('dragover', function (e) { e.preventDefault(); $(this).addClass('dragover'); });
    $zone.on('dragleave', function (e) { e.preventDefault(); $(this).removeClass('dragover'); });
    $zone.on('drop', function (e) {
      e.preventDefault(); $(this).removeClass('dragover');
      var files = e.originalEvent.dataTransfer.files;
      if (files && files.length) {
        try { var dt = new DataTransfer(); dt.items.add(files[0]); $input[0].files = dt.files; } catch (_) {}
        $input.trigger('change');
      }
    });
  }

  function setupUploads() {
    $('.apply-upload').each(function () { initUpload($(this)); });
  }

  // =========================================================================
  // Skills chips
  // =========================================================================
  function setupChips() {
    var $input = $('#skills_input'), $hidden = $('#technical_skills'), $wrap = $('#chipsWrap');
    if (!$input.length) return;
    function chips() { var c = []; $wrap.find('.apply-chip').each(function () { c.push($(this).data('v')); }); return c; }
    function sync() { $hidden.val(chips().join(', ')); }
    function add(t) {
      t = $.trim(t); if (!t || chips().indexOf(t) !== -1) return;
      $wrap.append($('<span class="apply-chip"></span>').data('v', t).text(t).append(' <button type="button" class="apply-chip__x">&times;</button>'));
      sync();
    }
    $wrap.on('click', '.apply-chip__x', function () { $(this).parent().remove(); sync(); });
    // Click chipbox to focus input
    $('#chipBox').on('click', function () { $input.focus(); });
    $input.on('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); $(this).val().split(',').forEach(add); $(this).val(''); }
      // Backspace on empty input removes last chip
      if (e.key === 'Backspace' && !$(this).val()) { $wrap.find('.apply-chip').last().remove(); sync(); }
    });
    $input.on('blur', function () { if ($.trim($(this).val())) { $(this).val().split(',').forEach(add); $(this).val(''); } });
  }

  // =========================================================================
  // Progress bar
  // =========================================================================
  function calcProgress() {
    var $bar = $('#progressBar'); if (!$bar.length) return;
    var cfg = getCfg();
    if (!cfg) { $bar.css('width', '0%'); return; }

    var fields = [
      { s: '#full_name' }, { s: '#email' }, { s: '#phone' }, { s: '#nationality' }, { s: '#residence' }, { s: '#affiliation' },
      { s: '#degree', t: 'sel' }, { s: '#field' }, { s: '#institution' }, { s: '#gpa' }, { s: '#graduation_date' },
      { s: '#english_proficiency', t: 'sel' }, { s: '#cv', t: 'file' },
      { s: '#ai_plans' }, { s: '#start_date' }, { s: '#duration', t: 'sel' },
      { s: '#ref1_name' }, { s: '#ref1_email' },
      { s: '#consent_data:checked', t: 'ex' }, { s: '#consent_accuracy:checked', t: 'ex' }
    ];

    // Add ref2 if required
    if (cfg.ref2Required) {
      fields.push({ s: '#ref2_name' }, { s: '#ref2_email' });
    }
    // Add extra required
    if (cfg.extraRequired) {
      cfg.extraRequired.forEach(function (id) { fields.push({ s: '#' + id }); });
    }
    // Pitch if required
    if (cfg.pitchRequired) { fields.push({ s: '#pitch_deck', t: 'file' }); }

    var total = fields.length + 2; // +research_areas, reflection
    var filled = 0;

    fields.forEach(function (f) {
      var $e = $(f.s); if (!$e.length) return;
      if (f.t === 'ex') filled++;
      else if (f.t === 'file') { if ($e[0].files && $e[0].files.length) filled++; }
      else if (f.t === 'sel') { if ($e.val()) filled++; }
      else { if ($.trim($e.val())) filled++; }
    });

    if ($('input[name="research_areas"]:checked').length) filled++;
    var rt = $('input[name="reflection_type"]:checked').val();
    if (rt === 'write' && $.trim($('#reflection_text').val())) filled++;
    else if (rt === 'upload' && document.getElementById('reflection_pdf') && document.getElementById('reflection_pdf').files.length) filled++;
    if ($('input[name="funding_status"]:checked').length) { total++; filled++; }

    var pct = Math.round(filled / total * 100) + '%';
    $bar.css('width', pct);
    $('#sideProgressBar').css('width', pct);
  }

  function setupProgress() {
    $('#applyForm').on('input change', 'input,select,textarea', debounce(calcProgress, 300));
  }

  // =========================================================================
  // Word / character counts
  // =========================================================================
  function setupCounts() {
    $('#reflection_text').on('input', function () {
      var w = $.trim($(this).val()).split(/\s+/).filter(Boolean).length;
      $('#reflectionWordCount').text(w + ' ' + (t('words') || 'words'));
    });
    $('#ai_plans').on('input', function () {
      $('#aiCharCount').text($(this).val().length + ' ' + (t('characters') || 'characters'));
    });
  }

  // =========================================================================
  // Draft auto-save
  // =========================================================================
  function setupDraft() {
    var $form = $('#applyForm'); if (!$form.length) return;
    function collect() {
      var d = {};
      $form.find('input[type="text"],input[type="email"],input[type="tel"],input[type="url"],input[type="date"],input[type="number"],select,textarea').each(function () { if (this.id) d[this.id] = $(this).val(); });
      $form.find('input[type="radio"]:checked').each(function () { d['_r_' + this.name] = this.value; });
      $form.find('input[type="checkbox"]:checked').each(function () { if (!d._cb) d._cb = []; d._cb.push(this.name + '=' + this.value); });
      return d;
    }
    function restore(d) {
      // Restore position first so sections reveal
      if (d._r_position_type) {
        $('input[name="position_type"][value="' + d._r_position_type + '"]').prop('checked', true);
        applyPositionConfig(d._r_position_type);
      }
      $.each(d, function (k, v) {
        if (k === '_cb') { v.forEach(function (s) { var p = s.split('='); $('input[name="' + p[0] + '"][value="' + p[1] + '"]').prop('checked', true).trigger('change'); }); }
        else if (k.indexOf('_r_') === 0) {
          var name = k.slice(3);
          if (name !== 'position_type') $('input[name="' + name + '"][value="' + v + '"]').prop('checked', true).trigger('change');
        }
        else { $('#' + k).val(v).trigger('change'); }
      });
    }
    $form.on('input change', 'input,select,textarea', debounce(function () {
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify(collect())); } catch (_) {}
    }, 1000));

    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        var data = JSON.parse(raw);
        if (data && Object.keys(data).length > 2) {
          var $b = $('<div class="apply-draft-banner"><span>You have a saved draft.</span><span><button class="restore" type="button">Restore</button> <button class="discard" type="button">Discard</button></span></div>');
          $('#draftSlot').append($b);
          $b.on('click', '.restore', function () { restore(data); $b.slideUp(200, function () { $b.remove(); }); });
          $b.on('click', '.discard', function () { localStorage.removeItem(DRAFT_KEY); $b.slideUp(200, function () { $b.remove(); }); });
        }
      }
    } catch (_) {}
  }

  // =========================================================================
  // Submit — merge dynamic fields into existing backend fields
  // =========================================================================
  function setupSubmit() {
    var $form = $('#applyForm'); if (!$form.length) return;
    $form.on('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;

      // Cloudflare Turnstile check
      var turnstileResponse = $('[name="cf-turnstile-response"]').val();
      if (!turnstileResponse) {
        var $err = $form.find('.apply-submit-error');
        if (!$err.length) { $err = $('<div class="apply-submit-error"></div>'); $form.prepend($err); }
        $err.text('Please complete the verification check.').show();
        scrollTo($('.apply-turnstile'));
        return;
      }

      var cfg = getCfg();

      // Collect research areas
      var areas = [];
      $('input[name="research_areas"]:checked').each(function () { areas.push(this.value); });
      var ov = $.trim($('#research_area_other').val()); if (ov) areas.push(ov);

      var fd = new FormData(this);

      // Merge dynamic fields into reflection_text (no backend changes needed)
      var reflText = $.trim(fd.get('reflection_text') || '');
      var meta = [];
      if ($('#years_since_phd').val()) meta.push('Years since PhD: ' + $('#years_since_phd').val());
      if ($('#num_publications').val()) meta.push('Publications: ' + $('#num_publications').val());
      if ($('#current_research_focus').val()) meta.push('Current Research Focus:\n' + $('#current_research_focus').val());
      if ($('#teaching_experience').val()) meta.push('Teaching Experience:\n' + $('#teaching_experience').val());
      if ($('#prior_research_experience').val()) meta.push('Prior Research Experience:\n' + $('#prior_research_experience').val());
      if ($('#coursework_interests').val()) meta.push('Coursework Interests:\n' + $('#coursework_interests').val());
      if (meta.length) {
        reflText = meta.join('\n\n') + '\n\n---\n\n' + reflText;
      }
      fd.set('reflection_text', reflText);

      // Merge enrollment info into affiliation
      var aff = fd.get('affiliation') || '';
      if ($('#enrollment_status').val()) aff += ' | Currently: ' + $('#enrollment_status').val();
      if ($('#expected_graduation').val()) aff += ' | Expected graduation: ' + $('#expected_graduation').val();
      fd.set('affiliation', aff);

      // Merge GRE into english_score
      var engScore = fd.get('english_score') || '';
      var gre = [];
      if ($('#gre_verbal').val()) gre.push('V:' + $('#gre_verbal').val());
      if ($('#gre_quantitative').val()) gre.push('Q:' + $('#gre_quantitative').val());
      if ($('#gre_writing').val()) gre.push('W:' + $('#gre_writing').val());
      if (gre.length) engScore += (engScore ? ' | ' : '') + 'GRE: ' + gre.join(', ');
      fd.set('english_score', engScore);

      // Clean up
      fd.delete('research_areas'); fd.set('research_areas', areas.join(', '));
      fd.delete('consent_data'); fd.delete('consent_accuracy'); fd.delete('skills_input');

      $('#applyLoading').fadeIn(200);
      $form.find('button,input,select,textarea').prop('disabled', true);

      $.ajax({ url: API_URL + '/api/apply', method: 'POST', data: fd, processData: false, contentType: false, timeout: 120000 })
      .done(function (res) {
        $('#applyLoading').fadeOut(200);
        try { localStorage.removeItem(DRAFT_KEY); } catch (_) {}
        if (res && res.application_id) $('#successRefId').html('Reference: <strong>' + $('<span>').text(res.application_id).html() + '</strong>');
        // Personalize success title
        var greeting = getGreeting();
        if (greeting) {
          $('.apply-success__title').text('Thank you, ' + greeting + '!');
        }
        $form.slideUp(400); $('.apply-hero').slideUp(400); $('#applyTopbar').slideUp(400);
        $('#sideNav').fadeOut(400); $('#sideTips').fadeOut(400);
        $('#applySuccess').slideDown(400);
        scrollTo($('#applySuccess'));
      })
      .fail(function (xhr) {
        $('#applyLoading').fadeOut(200);
        $form.find('button,input,select,textarea').prop('disabled', false);
        var msg = 'Something went wrong. Please try again.';
        try { var b = JSON.parse(xhr.responseText); msg = b.detail || b.message || msg; } catch (_) {}
        var $err = $form.find('.apply-submit-error');
        if (!$err.length) { $err = $('<div class="apply-submit-error"></div>'); $form.prepend($err); }
        $err.text(msg).show(); scrollTo($err);
      });
    });
  }

  // =========================================================================
  // Step/sidebar tracker — highlights current section, swaps tips
  // =========================================================================
  function setupStepTracker() {
    var $steps = $('.apply-step');
    var $sideLinks = $('.apply-sidenav__link');
    var $sections = $('section.apply-section[id]');

    // Click step (topbar) to scroll
    $steps.on('click', function () {
      var idx = parseInt($(this).data('step')) - 1;
      var $target = $sections.eq(idx);
      if ($target.length && $target.is(':visible')) scrollTo($target);
    });

    // Click sidebar link to scroll
    $sideLinks.on('click', function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href'));
      if ($target.length && $target.is(':visible')) scrollTo($target);
    });

    // On scroll, highlight current step + swap tip
    $(window).on('scroll', debounce(function () {
      var scrollTop = $(window).scrollTop() + 200;
      var activeIdx = 0;

      $sections.each(function (i) {
        if ($(this).is(':visible') && $(this).offset().top <= scrollTop) {
          activeIdx = i;
        }
      });

      var step = activeIdx + 1;

      // Update topbar steps
      $steps.removeClass('active');
      $steps.filter('[data-step="' + step + '"]').addClass('active');

      // Update sidebar nav
      $sideLinks.removeClass('active');
      $sideLinks.filter('[data-step="' + step + '"]').addClass('active');

      // Swap tip panel
      $('.apply-sidetip').hide();
      $('.apply-sidetip[data-tip="' + step + '"]').fadeIn(200);

      updateStepDone();
    }, 100));
  }

  function updateStepDone() {
    var cfg = getCfg(); if (!cfg) return;
    var checks = {
      1: function () { return !!getPos(); },
      2: function () { return !!$('#full_name').val() && !!$('#email').val() && !!$('#nationality').val(); },
      3: function () { return !!$('#degree').val() && !!$('#institution').val() && !!$('#gpa').val(); },
      4: function () { return document.getElementById('cv').files.length > 0; },
      5: function () { return $('input[name="research_areas"]:checked').length > 0 && !!$('#ai_plans').val(); },
      6: function () { return !!$('#start_date').val() && !!$('#ref1_name').val() && !!$('#ref1_email').val(); }
    };

    // Update both topbar steps and sidebar links
    $('[data-step]').each(function () {
      var step = parseInt($(this).data('step'));
      var fn = checks[step];
      if (fn && fn() && !$(this).hasClass('active')) {
        $(this).addClass('done');
      } else if (!fn || !fn()) {
        $(this).removeClass('done');
      }
    });
  }

  // =========================================================================
  // Language toggle (EN / Arabic / Indonesian)
  // =========================================================================
  var currentLang = 'en';

  function setupLangToggle() {
    // Set initial active
    var saved = null;
    try { saved = localStorage.getItem('vvlab-apply-lang'); } catch (_) {}
    if (saved && I18N && I18N.hero_title && I18N.hero_title[saved]) {
      currentLang = saved;
    }
    $('.apply-lang__btn[data-lang="' + currentLang + '"]').addClass('active');
    if (currentLang !== 'en') applyLang(currentLang);

    // Toggle handler
    $('.apply-lang__btn').on('click', function () {
      var lang = $(this).data('lang');
      if (lang === currentLang) return;
      $('.apply-lang__btn').removeClass('active');
      $(this).addClass('active');
      currentLang = lang;
      try { localStorage.setItem('vvlab-apply-lang', lang); } catch (_) {}
      applyLang(lang);
    });
  }

  function t(key) {
    if (typeof I18N === 'undefined' || !I18N[key]) return null;
    return I18N[key][currentLang] || I18N[key].en || null;
  }

  function applyLang(lang) {
    if (typeof I18N === 'undefined') return;

    // RTL for Arabic
    if (lang === 'ar') {
      $('.apply-page').attr('dir', 'rtl');
    } else {
      $('.apply-page').removeAttr('dir');
    }

    // 1. All [data-i18n] elements (sidebar tips, steps, etc.)
    $('[data-i18n]').each(function () {
      var key = $(this).data('i18n');
      var val = I18N[key] && I18N[key][lang];
      if (!val) return;
      // Quality note has nested <p> — handle specially
      if ($(this).hasClass('apply-quality-note')) {
        $(this).find('p').text(val);
        return;
      }
      $(this).html(val);
    });

    // 2. Hero
    function setT($el, key) { var v = t(key); if (v && $el.length) $el.html(v); }
    setT($('.apply-hero__badge'), 'hero_badge');
    setT($('.apply-hero__title'), 'hero_title');
    setT($('.apply-hero__sub'), 'hero_sub');
    setT($('.apply-hero__desc'), 'hero_desc');

    // 3. Section titles
    var secTitles = { 1: 'sec1_title', 2: 'sec2_title', 3: 'sec3_title', 4: 'sec4_title', 5: 'sec5_title', 6: 'sec6_title' };
    $('section.apply-section[id]').each(function (i) {
      var key = secTitles[i + 1];
      if (key) $(this).find('.apply-section__title').first().html(t(key));
    });
    // Section 4 hint
    setT($('#sec-4 .apply-section__hint'), 'sec4_hint');

    // 4. Role cards
    var roleKeys = ['role_postdoc', 'role_phd', 'role_masters', 'role_intern'];
    var roleSubKeys = ['role_postdoc_sub', 'role_phd_sub', 'role_masters_sub', 'role_intern_sub'];
    $('.apply-role-card').each(function (i) {
      $(this).find('.apply-role-card__label').html(t(roleKeys[i]) || '');
      $(this).find('.apply-role-card__sub').html(t(roleSubKeys[i]) || '');
    });
    setT($('#preselectHint'), 'preselect');

    // 5. Labels (by for attribute or id)
    var lblMap = {
      full_name: 'lbl_fullname', email: 'lbl_email', phone: 'lbl_phone',
      nationality: 'lbl_nationality', residence: 'lbl_residence', affiliation: 'lbl_affiliation',
      enrollment_status: 'lbl_enrollment', expected_graduation: 'lbl_expected_grad',
      google_scholar: 'lbl_scholar', personal_website: 'lbl_website',
      degree: 'lbl_degree', field: 'lbl_field', institution: 'lbl_institution',
      gpa: 'lbl_gpa', graduation_date: 'lbl_graddate', english_proficiency: 'lbl_english',
      english_score: 'lbl_score', years_since_phd: 'lbl_years_phd', num_publications: 'lbl_publications',
      current_research_focus: 'lbl_research_focus', teaching_experience: 'lbl_teaching',
      prior_research_experience: 'lbl_prior_research', coursework_interests: 'lbl_coursework',
      start_date: 'lbl_start_date', duration: 'lbl_duration', heard_about: 'lbl_how_find',
      fellowship_name: 'lbl_fellowship_name'
    };
    $.each(lblMap, function (forAttr, i18nKey) {
      var $lbl = $('label[for="' + forAttr + '"]');
      if (!$lbl.length) return;
      var val = t(i18nKey);
      if (!val) return;
      var hasReq = $lbl.find('.req').length;
      $lbl.html(val + (hasReq ? ' <span class="req">*</span>' : ''));
    });

    // 6. Select options
    translateSelectOptions($('#degree'), { "Bachelor's": 'opt_bachelors', "Master's": 'opt_masters', "PhD": 'opt_phd', "Other": 'opt_other' });
    translateSelectOptions($('#english_proficiency'), { "Native": 'opt_native' });
    translateSelectOptions($('#enrollment_status'), { "Undergraduate": 'opt_undergrad', "Master's student": 'opt_masters_student', "PhD student": 'opt_phd_student' });
    translateSelectOptions($('#heard_about'), { "Lab website": 'opt_lab_website', "Faculty referral": 'opt_faculty', "Conference": 'opt_conference', "Twitter/X": 'opt_twitter', "LinkedIn": 'opt_linkedin', "Job board": 'opt_jobboard', "Other": 'opt_other' });
    translateSelectOptions($('#duration'), { "3 months": 'opt_3m', "6 months": 'opt_6m', "1 year": 'opt_1y', "2 years": 'opt_2y', "Full program duration": 'opt_full' });

    // 7. Pill labels (research areas, funding, family)
    var pillMap = {
      'AI Safety & Verification': 'lbl_ai_safety', 'Autonomous Systems': 'lbl_autonomous',
      'Machine Learning / Deep Learning': 'lbl_ml', 'Optimization & Decision Making': 'lbl_optim',
      'Natural Language Processing': 'lbl_nlp', 'Computer Vision': 'lbl_cv_area', 'Other': 'lbl_other',
      'Self-funded': 'lbl_self_funded', 'Seeking funding': 'lbl_seeking',
      'Have external fellowship': 'lbl_fellowship',
      'Single / no dependents': 'lbl_single', 'Bringing spouse': 'lbl_spouse',
      'Bringing spouse and children': 'lbl_spouse_children', 'Undecided': 'lbl_undecided'
    };
    $('.apply-pill, .apply-pill--radio').each(function () {
      var $inp = $(this).find('input');
      var key = pillMap[$inp.val()];
      if (key) $(this).find('span').text(t(key) || '');
    });

    // 8. Standalone labels (no for attribute)
    // Skills
    $('[for="skills_input"]').closest('.apply-field').find('.apply-label').first().html(t('lbl_skills') || 'Technical skills');
    // Research areas label
    var $raLabel = $('.apply-pill-grid').closest('.apply-field').find('.apply-label').first();
    if ($raLabel.length && $raLabel.text().match(/Research|Bidang|مجالات/)) {
      $raLabel.html((t('lbl_research_areas') || 'Research areas of interest') + ' <span class="req">*</span>');
    }
    // Family label
    var $famField = $('input[name="family_status"]').closest('.apply-field');
    $famField.find('.apply-label').first().html(t('lbl_family') || 'Family / dependents');
    $famField.find('.apply-sublabel').first().html(t('lbl_family_sub') || '');
    // Funding label
    var $fundField = $('input[name="funding_status"]').closest('.apply-field');
    $fundField.find('.apply-label').first().html((t('lbl_funding') || 'Funding') + ' <span class="req">*</span>');
    // GRE label + note
    var $greLabel = $('#gre_verbal').closest('.apply-field--dyn').find('.apply-label').first();
    if ($greLabel.length) $greLabel.html((t('lbl_gre') || 'GRE scores') + ' <span style="color:var(--text-tertiary);font-weight:400">(optional)</span>');
    var $greNote = $('#gre_verbal').closest('.apply-field--dyn').find('.apply-sublabel').first();
    if ($greNote.length) $greNote.html(t('lbl_gre_note') || '');
    // Prior research sub
    var $prSub = $('#prior_research_experience').closest('.apply-field').find('.apply-sublabel');
    if ($prSub.length) $prSub.html(t('lbl_prior_research_sub') || '');

    // 9. Upload zones
    var uploadMap = { cv: ['lbl_cv', 'lbl_cv_spec'], pitch_deck: ['lbl_pitch', 'lbl_pitch_spec'], reflection_pdf: ['lbl_reflection_pdf', 'lbl_cv_spec'] };
    $.each(uploadMap, function (id, keys) {
      var $zone = $('[data-for="' + id + '"] .apply-upload__text');
      if ($zone.length) {
        $zone.find('strong').html(t(keys[0]) || '');
        $zone.find('span').html(t(keys[1]) || '');
      }
    });

    // 10. Toggle buttons (write/upload)
    $('.apply-toggle__opt').each(function () {
      var v = $(this).find('input').val();
      if (v === 'write') $(this).find('span').text(t('lbl_write_here') || 'Write here');
      if (v === 'upload') $(this).find('span').text(t('lbl_upload_pdf') || 'Upload PDF');
    });

    // 11. Consent & submit
    var $consentData = $('#consent_data').closest('.apply-check').find('span').last();
    $consentData.html((t('consent_data') || '') + ' <a href="mailto:ai-v-and-v-lab@kfupm.io">ai-v-and-v-lab@kfupm.io</a>.');
    var $consentAcc = $('#consent_accuracy').closest('.apply-check').find('span').last();
    $consentAcc.text(t('consent_accuracy') || '');
    $('.apply-submit__text').text(t('btn_submit') || 'Submit Application');

    // 12. Success
    setT($('.apply-success__title'), 'success_title');
    $('.apply-success__text').first().html(t('success_text') || '');
    var $sc = $('.apply-success__contact');
    $sc.html((t('success_contact') || 'Questions?') + ' <a href="mailto:ai-v-and-v-lab@kfupm.io">ai-v-and-v-lab@kfupm.io</a>');

    // 13. All placeholders
    var phMap = {
      full_name: 'ph_passport', email: 'ph_email', phone: 'ph_phone',
      google_scholar: 'ph_scholar', personal_website: 'ph_website',
      gpa: 'ph_gpa', english_score: 'ph_score',
      years_since_phd: 'ph_years_phd', num_publications: 'ph_pubs',
      gre_verbal: 'ph_gre_v', gre_quantitative: 'ph_gre_q', gre_writing: 'ph_gre_w',
      skills_input: 'ph_skills', research_area_other: 'ph_other_area',
      current_research_focus: 'ph_research_focus', teaching_experience: 'ph_teaching',
      prior_research_experience: 'ph_prior_res', coursework_interests: 'ph_coursework',
      ai_plans: 'ph_ai_plans', reflection_text: 'ph_reflection',
      fellowship_name: 'ph_fellowship'
    };
    $.each(phMap, function (id, key) {
      var v = t(key); if (v) $('#' + id).attr('placeholder', v);
    });

    // 14. Reference placeholders
    $('[id^="ref1_"], [id^="ref2_"]').each(function () {
      var id = this.id;
      if (id.match(/name/)) $(this).attr('placeholder', t('lbl_ref_name') || 'Full name');
      if (id.match(/email/)) $(this).attr('placeholder', t('lbl_ref_email') || 'Email');
      if (id.match(/affiliation/)) $(this).attr('placeholder', t('lbl_ref_affil') || 'Affiliation');
      if (id.match(/relationship/)) $(this).attr('placeholder', t('lbl_ref_rel') || 'Relationship to you');
    });

    // 15. Loading text
    var $loadP = $('#applyLoading .apply-overlay__inner p');
    if ($loadP.length) $loadP.html(t('loading') || 'Submitting your application\u2026');

    // 16. Re-apply position config microcopy if a position is selected
    var pos = getPos();
    if (pos) {
      var cfg = POS[pos];
      applyPositionMicrocopy(pos);
      updateRefsLabel(cfg);
      // Re-translate pitch hint
      var pitchHintText = cfg.pitchRequired ? (t('pos_pitch_req') || cfg.pitchHint) : (t('pos_pitch_opt') || cfg.pitchHint);
      $('#pitchHint').text(pitchHintText);
      if ($('#pitchOptBadge').length) $('#pitchOptBadge').text(t('lbl_optional') || 'optional');
      // Re-translate duration options
      translateSelectOptions($('#duration'), { "3 months": 'opt_3m', "6 months": 'opt_6m', "1 year": 'opt_1y', "2 years": 'opt_2y', "Full program duration": 'opt_full' });
      // Re-trigger word/char counts
      $('#reflection_text').trigger('input');
      $('#ai_plans').trigger('input');
    }
  }

  // Separate function to apply position-specific translated microcopy
  function applyPositionMicrocopy(posType) {
    var cfg = POS[posType]; if (!cfg) return;
    var s = cfg.short;

    // Position message
    var msgKey = 'pos_msg_' + s;
    $('#positionMsgText').text(t(msgKey) || cfg.msg);

    // Reflection label & sublabel
    var reflLblKey = 'pos_refl_label_' + s;
    var reflLbl = t(reflLblKey);
    if (reflLbl) { $('#reflectionLabel').html(reflLbl + ' <span class="req">*</span>'); }

    var reflSubKey = 'pos_refl_sub_' + s;
    var reflSub = t(reflSubKey);
    if (reflSub) { $('#reflectionSublabel').text(reflSub); }

    // AI plans label
    var aiKey = 'pos_ai_' + s;
    var aiLbl = t(aiKey);
    if (aiLbl) { $('#aiPlansLabel').html(aiLbl + ' <span class="req">*</span>'); }

    // Skills sublabel
    var skillKey = 'pos_skills_' + s;
    var skillSub = t(skillKey);
    if (skillSub) { $('#skillsSublabel').text(skillSub); }

    // Affiliation placeholder
    var affKey = 'ph_affil_' + (s === 'postdoc' ? 'post' : s === 'phd' ? 'phd' : s === 'masters' ? 'ms' : 'int');
    var affPh = t(affKey);
    if (affPh) { $('#affiliation').attr('placeholder', affPh); }
  }

  function getGreeting() {
    var designation = $.trim($('#designation').val() || '');
    var shortName = $.trim($('#short_name').val() || '');
    if (!shortName) return '';
    if (designation) return designation + ' ' + shortName;
    return shortName;
  }

  function updateWelcomeMessage(cfg) {
    if (!cfg) cfg = getCfg();
    if (!cfg) return;
    var msgKey = 'pos_msg_' + cfg.short;
    var msgText = t(msgKey) || cfg.msg;
    var greeting = getGreeting();
    if (greeting) {
      // Replace generic greeting with personalized one
      msgText = msgText
        .replace(/Welcome, researcher\.?/i, 'Welcome, ' + greeting + '.')
        .replace(/Welcome, colleague\.?/i, 'Welcome, ' + greeting + '.')
        .replace(/^A PhD/i, greeting + ', a PhD')
        .replace(/^A Master/i, greeting + ', a Master')
        .replace(/^Internships/i, greeting + ', internships');
    }
    $('#sideTipPosMsg').text(msgText).fadeIn(200);
  }

  function updateRefsLabel(cfg) {
    var label, hint;
    if (cfg.ref2Hidden) {
      label = t('pos_refs_1only') || 'Reference';
      hint = t('pos_refs_1only_h') || '(1 required)';
    } else if (!cfg.ref2Required) {
      label = t('pos_refs_1req') || 'References';
      hint = t('pos_refs_1req_h') || '(1 required, 2nd optional)';
    } else {
      label = t('pos_refs_2req') || 'References';
      hint = t('pos_refs_2req_h') || '(2 required)';
    }
    $('#refsLabel').html(label + ' <span class="req">*</span> <span style="font-weight:400;color:var(--text-tertiary);font-size:0.82rem">' + hint + '</span>');
  }

  function updatePositionLinks(cfg) {
    if (!cfg) return;
    var s = cfg.short;

    // Tip 1 links — position-specific program + always show research centers
    var $links = $('#tipLinksPos');
    $links.empty();
    $links.append('<a href="/research" target="_blank">Our research areas &rarr;</a>');

    // Position-specific program links
    if (s === 'masters') {
      $links.append('<a href="https://ise.kfupm.edu.sa/programs/graduate-program/ms-program-in-ise/" target="_blank">MS Program in ISE &rarr;</a>');
    }
    if (s === 'phd') {
      $links.append('<a href="https://ise.kfupm.edu.sa/programs/graduate-program/phd-program-in-ise/" target="_blank">PhD Program in ISE &rarr;</a>');
    }
    // ISE department for non-interns
    if (s !== 'intern') {
      $links.append('<a href="https://ise.kfupm.edu.sa/" target="_blank">ISE Department &rarr;</a>');
    }
    // Research centers for all
    $links.append('<a href="https://irc-sml.kfupm.edu.sa" target="_blank">IRC Smart Mobility &amp; Logistics &rarr;</a>');
    $links.append('<a href="https://sdaia-jrcai.kfupm.edu.sa" target="_blank">JRC-AI (KFUPM-SDAIA) &rarr;</a>');

    // Tip 6 links — logistics, also position-aware
    var $logLinks = $('#tipLinksLogistics');
    $logLinks.empty();
    if (s === 'masters') {
      $logLinks.append('<a href="https://ise.kfupm.edu.sa/programs/graduate-program/ms-program-in-ise/" target="_blank">MS Program details &rarr;</a>');
    }
    if (s === 'phd') {
      $logLinks.append('<a href="https://ise.kfupm.edu.sa/programs/graduate-program/phd-program-in-ise/" target="_blank">PhD Program details &rarr;</a>');
    }
    if (s === 'masters' || s === 'phd') {
      $logLinks.append('<a href="https://www.kfupm.edu.sa/deanships/dgs/" target="_blank">Graduate Studies &rarr;</a>');
    }
    $logLinks.append('<a href="https://www.kfupm.edu.sa" target="_blank">KFUPM campus &amp; life &rarr;</a>');
    $logLinks.append('<a href="https://visa.mofa.gov.sa" target="_blank">Saudi visa info &rarr;</a>');
  }

  // =========================================================================
  // Init
  // =========================================================================
  $(function () {
    setupConditionals();
    setupUploads();
    setupChips();
    setupProgress();
    setupCounts();
    setupDraft();
    setupSubmit();
    setupStepTracker();
    setupLangToggle();

    // If position was pre-selected (e.g. from draft restore), apply config
    var preSelected = getPos();
    if (preSelected) applyPositionConfig(preSelected);
  });

})(jQuery);
