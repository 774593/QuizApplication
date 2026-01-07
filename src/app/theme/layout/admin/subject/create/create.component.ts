// ... (imports unchanged)
  submit() {
    if (this.form.invalid) return;
    this.submitting = true;
    const v = this.form.value;

    const payload = {
      subId: v.subId,
      subName: v.subName,
      createdBy: v.createdBy ?? 'Admin',
      createdOn: this.toDateOnly(v.createdOn),
      updatedBy: v.updatedBy ?? '',
      updatedOn: this.toDateOnly(v.updatedOn),
      isActive: v.isActive ?? 'Y',
      isDeleted: v.isDeleted ?? 'N'
    };

    this.svc.create(payload).subscribe({
      next: () => this.router.navigate(['/subject']),
      error: (err) => {
        console.error('Create failed', err);
        // If the API returned validation errors, show them to the user
        const server = err?.error;
        if (server && server.errors) {
          // server.errors is usually an object like { "SubName": ["..."], "CreatedBy": ["..."] }
          const messages: string[] = [];
          for (const key of Object.keys(server.errors)) {
            const arr = server.errors[key];
            if (Array.isArray(arr)) {
              messages.push(...arr.map((m: any) => `${key}: ${m}`));
            } else {
              messages.push(`${key}: ${arr}`);
            }
          }
          alert('Create failed:\n' + messages.join('\n'));
        } else {
          alert('Create failed: ' + (server?.title ?? err.message));
        }
        this.submitting = false;
      }
    });
  }